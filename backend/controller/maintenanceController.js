const Maintenance = require("../models/maintenaceModel")
const { compare } = require("../utils/compare");
const user = require("../models/userModel");
const Owner = require("../models/ownerModel");
const Tenant = require("../models/tenantModel");

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
// exports.CreateMaintenance= async (req,res)=>{
//     try {
//         const {Maintenance_Amount,Penalty_Amount,DueDate,PenaltyDay}=req.body;
//         if(!Maintenance_Amount || !Penalty_Amount || !DueDate || !PenaltyDay){
//             return res.status(400).json({
//                 success:false,
//                 message:"All fields are required"
//             })
//         }
//         const maintenance= new Maintenance({
//             Maintenance_Amount,
//             Penalty_Amount,
//             DueDate,
//             PenaltyDay
//         })
//         await maintenance.save();

//         const ownerData = await Owner.find();
//         const TenantData = await Tenant.find();
    
//         const ResidentList = [...ownerData, ...TenantData];
    
//         const residentStatus = ResidentList.map((resident) => ({
//           resident: resident.id,
//           paymentStatus: "pending",
//           residentType: resident.Resident_status,
//           paymentMode:"cash"
//         }));
    
      
    
//         maintenance.ResidentList = residentStatus;
    
//         await maintenance.save();
    
        
//         if(!maintenance){
//             return res.status(400).json({
//                 success:false,
//                 message:"Soemthing went wrong"
//             })
//         }
//         return res.status(200).json({
//             success:true,
//             message:"Maintenance Successfully Added"
//         })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }

// }
exports.CreateMaintenance = async (req, res) => {
    try {
        const { Maintenance_Amount, Penalty_Amount, DueDate, PenaltyDay } = req.body;

        // Check if all required fields are present
        if (!Maintenance_Amount || !Penalty_Amount || !DueDate || !PenaltyDay) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Create and save the new maintenance entry
        const maintenance = new Maintenance({
            Maintenance_Amount,
            Penalty_Amount,
            DueDate,
            PenaltyDay,
        });

        // Fetch all owner and tenant data
        const ownerData = await Owner.find();
        const tenantData = await Tenant.find();

        // Merge and format resident data
        const ResidentList = [...ownerData, ...tenantData].map((resident) => ({
            resident: resident.id,
            paymentStatus: "pending",
            residentType: resident.Resident_status || "unknown", // Handle missing Resident_status gracefully
            paymentMode: "cash",
        }));

        // Attach the resident list to the maintenance entry
        maintenance.ResidentList = ResidentList;

        // Save maintenance with resident data
        await maintenance.save();

        return res.status(200).json({
            success: true,
            message: "Maintenance successfully added",
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
// exports.GetMaintenance =async (req,res)=>{
//     try {
//         const  maintenance= await Maintenance.find()
//         return res.status(200).json({
//           success: true,
//           Maintenance: maintenance,
//         });
//       } catch (error) {
//         console.error("Error fetching Maintenance:", error);
//         return res.status(500).json({
//           success: false,
//           message: "Error fetching Maintenance",
//         });
//       }
// }
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

////update and get payment
exports.changePaymentDetails = async (req, res) => {
    const { maintenanceId } = req.params; 
    const { paymentMode } = req.body; 
    const residentId = req.user.id; 

    try {
        // Validate input
        if (!paymentMode) {
            return res.status(400).json({
                success: false,
                message: "Payment mode is required",
            });
        }

        const updatedMaintenance = await Maintenance.findOneAndUpdate(
            { 
                _id: maintenanceId, 
                "ResidentList.resident": residentId 
            }, 
            { 
                $set: { 
                    "ResidentList.$.paymentMode": paymentMode, 
                    "ResidentList.$.paymentStatus": "done"   
                } 
            },
            { new: true }
        ).populate("ResidentList.resident"); 

        if (!updatedMaintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record or resident not found",
            });
        }

        // Respond with the updated maintenance record
        return res.status(200).json({
            success: true,
            message: "Payment details updated successfully",
            Maintenance: updatedMaintenance,
        });
    } catch (error) {
        // Log and handle errors
        console.error("Error updating payment details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating payment details",
        });
    }
};


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
  
   