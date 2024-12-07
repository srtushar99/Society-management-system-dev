const Maintenance = require("../models/maintenaceModel")
const { compare } = require("../utils/compare");
const User = require("../models/userModel");
const Owner = require("../models/ownerModel");
const Tenant = require("../models/tenantModel");
const Notification = require('../models/notificationModel'); 
const crypto = require("crypto");
const Razorpay = require("razorpay");
const dotenv = require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});


//check password correction in maintenance
exports.CheckMaintenancePassword = async (req, res) => {
    try {
       
        const { Password } = req.body;

        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        
        const isPasswordCorrect = await compare(Password, req.user.Password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password verified successfully"
        });

    } catch (error) {
        console.error("Error during password verification:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


//add maintenance


exports.CreateMaintenance = async (req, res) => {
  try {
    const { Maintenance_Amount, Penalty_Amount, DueDate, PenaltyDay } = req.body;

    // Check if all required fields are present
    if (!Maintenance_Amount || !Penalty_Amount || !DueDate || !PenaltyDay) {
      return res.status(400).json({
        success: false,
        message: "All fields, including payment mode, are required.",
      });
    }

    // Create and save the new maintenance entry
    const maintenance = new Maintenance({
      Maintenance_Amount,
      Penalty_Amount,
      DueDate,
      PenaltyDay,
    });
    const ownerData = await Owner.find();
    const tenantData = await Tenant.find();
    const ResidentList = [...ownerData, ...tenantData].map((resident) => ({
                  resident: resident.id,
                  paymentStatus: "pending",
                  residentType: resident.Resident_status || "unknown", 
                  paymentMode: "cash",
              }));

              maintenance.ResidentList = ResidentList;
              await maintenance.save();
      

    // Fetch users

    const adminData = await User.find({ role: "admin" });

    const ownerUsers = ownerData.map((owner) => ({ _id: owner._id, model: "Owner" }));
    const tenantUsers = tenantData.map((tenant) => ({ _id: tenant._id, model: "Tenant" }));
    const adminUsers = adminData.map((admin) => ({ _id: admin._id, model: "User" }));

    const allUsers = [...ownerUsers, ...tenantUsers, ...adminUsers];

    // Create the notification
    const notification = new Notification({
      title: "Update Maintenance",
      name: "System",
      message: `₹ ${Maintenance_Amount}₹ ${Penalty_Amount}`,
      users: allUsers, // Attach all relevant users
    });

    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Maintenance successfully added and notifications sent",
    });
  } catch (error) {
    console.error("Error in CreateMaintenance:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



//get maintenance  admin side 

exports.GetMaintenance = async (req, res) => {
    try {
      const maintenanceRecord = await Maintenance.find().populate("ResidentList.resident");
      return res.status(200).json({
        success: true,
        Maintenance: maintenanceRecord,
      });
    } catch (error) {
      console.error("Error fetching Maintenance:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching Maintenance",
      });
    }
  };

// ////update and get payment
// exports.changePaymentDetails = async (req, res) => {
//     const { maintenanceId } = req.params; 
//     const { paymentMode } = req.body; 
//     const residentId = req.user.id; 

//     try {
//         // Validate input
//         if (!paymentMode) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Payment mode is required",
//             });
//         }

//         const updatedMaintenance = await Maintenance.findOneAndUpdate(
//             { 
//                 _id: maintenanceId, 
//                 "ResidentList.resident": residentId 
//             }, 
//             { 
//                 $set: { 
//                     "ResidentList.$.paymentMode": paymentMode, 
//                     "ResidentList.$.paymentStatus": "done"   
//                 } 
//             },
//             { new: true }
//         ).populate("ResidentList.resident"); 

//         if (!updatedMaintenance) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Maintenance record or resident not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Payment details updated successfully",
//             Maintenance: updatedMaintenance,
//         });
//     } catch (error) {
//         console.error("Error updating payment details:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error while updating payment details",
//         });
//     }
// };


  //fetchUserPendingMaintenance

exports.fetchUserPendingMaintenance = async (req, res) => {
    try {
      const userId = req.user.id; 
      console.log("Logged-in User ID:", userId);

      const userMaintenanceRecords = await Maintenance.find({
        "ResidentList.resident": userId,
      }).populate({
        path: "ResidentList.resident",
        match: { _id: userId },
        select: "name email role", 
      });
  
      console.log("Raw User Maintenance Records:", JSON.stringify(userMaintenanceRecords, null, 2));

      if (!userMaintenanceRecords || userMaintenanceRecords.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No maintenance records found for the logged-in user.",
        });
      }

      const pendingMaintenanceRecords = userMaintenanceRecords
        .map((record) => {
          const pendingResidents = record.ResidentList.filter(
            (residentEntry) =>
              residentEntry.resident && 
              String(residentEntry.resident._id) === userId && 
              residentEntry.paymentStatus === "pending" 
          );
  
          console.log(
            `Pending Residents for Maintenance ID ${record._id}:`,
            pendingResidents
          );
  
          return pendingResidents.length > 0
            ? { ...record._doc, ResidentList: pendingResidents } 
            : null; 
        })
        .filter((record) => record !== null); 
  
      console.log("Filtered Pending Maintenance Records:", JSON.stringify(pendingMaintenanceRecords, null, 2));

      if (pendingMaintenanceRecords.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No pending maintenance records found for the logged-in user.",
        });
      }
  
      return res.status(200).json({
        success: true,
        Maintenance: pendingMaintenanceRecords,
      });
    } catch (error) {
      console.error("Error fetching user maintenance records:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching user maintenance records",
      });
    }
  };

  exports.updatePaymentMode = async (req, res) => {
    const { maintenanceId } = req.params;
    const { paymentMode, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
    const residentId = req.user.id;
    console.log(residentId);
    
  
    try {
      // Fetch maintenance record
      const maintenanceRecord = await Maintenance.findById(maintenanceId);
      if (!maintenanceRecord) {
        return res.status(404).json({
          success: false,
          message: "Maintenance record not found",
        });
      }
  
      const Maintenance_Amount = maintenanceRecord.Maintenance_Amount;
  
      // Step 1: Create Razorpay Order if order ID is not provided
      if (!razorpayOrderId) {
        const razorpayOrder = await razorpay.orders.create({
          amount: Maintenance_Amount * 100, // Convert to paisa
          currency: "INR",
          receipt: `receipt_${maintenanceId}_${residentId}`,
        });
  
        return res.status(200).json({
          success: true,
          razorpayOrderId: razorpayOrder.id,
          amount: Maintenance_Amount,
          message: "Razorpay order created successfully",
        });
      }
  
      // Step 2: Validate Razorpay Payment
      if (razorpayPaymentId && razorpaySignature) {
        const generatedSignature = crypto
          .createHmac("sha256", process.env.key_secret)
          .update(`${razorpayOrderId}|${razorpayPaymentId}`)
          .digest("hex");
          console.log(generatedSignature);
  
        // Check if generated signature matches the provided signature
        if (generatedSignature !== razorpaySignature) {
          return res.status(400).json({
            success: false,
            message: "Payment verification failed. Invalid signature.",
          });
        }
          
        
        // Step 3: Update Payment Status in Maintenance Record
        const updatedMaintenance = await Maintenance.findOneAndUpdate(
          { _id: maintenanceId, "ResidentList.resident": residentId },
          {
            $set: {
              "ResidentList.$.paymentMode": paymentMode || "Razorpay",
              "ResidentList.$.paymentStatus": "done",
            },
          },
          { new: true }
        ).populate("ResidentList.resident");
  
        if (!updatedMaintenance) {
          return res.status(404).json({
            success: false,
            message: "Maintenance record or resident not found.",
          });
        }
  
        return res.status(200).json({
          success: true,
          message: "Payment successfully updated.",
         
        });
      }
  
      // Step 4: Incomplete Payment Details
      return res.status(400).json({
        success: false,
        message: "Incomplete payment details provided.",
      });
    } catch (error) {
      console.error("Error during Razorpay integration:", error);
      return res.status(500).json({
        success: false,
        message: "Error updating payment mode.",
      });
    }
  };
  
  
//get done maintannace 

exports.getResidentsWithCompletedPayments = async (req, res) => {
    try {

      const maintenanceRecords = await Maintenance.find({
        "ResidentList.paymentStatus": "done",
      }).populate("ResidentList.resident");
   
      const filteredRecords = maintenanceRecords.map((record) => {
        const completedResidents = record.ResidentList.filter(
          (resident) => resident.paymentStatus === "done"
        );
  
 
        return { ...record._doc, ResidentList: completedResidents }; 
      });
  
      return res.status(200).json({
        success: true,
        Maintenance: filteredRecords,
      });
    } catch (error) {
      console.error("Error fetching residents with completed payments:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching residents with completed payments",
      });
    }
  };
  