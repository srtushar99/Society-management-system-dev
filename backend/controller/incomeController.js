const Income = require("../models/incomeModel");
const moment = require('moment');
const Owner = require("../models/ownerModel");
const Tenant = require("../models/tenantModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const dotenv = require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

// create income
exports.CreateIncome = async (req, res) => {
    try {
        const { title, date, dueDate, description, amount, member } = req.body;

        if (!title || !date || !dueDate || !description || !amount) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Parse date strings to Date objects
        const parsedDate = moment(date, "DD/MM/YYYY").toDate();
        const parsedDueDate = moment(dueDate, "DD/MM/YYYY").toDate();

        // Validate parsed dates
        if (isNaN(parsedDate) || isNaN(parsedDueDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use DD/MM/YYYY"
            });
        }

        // Create the income entry
        const income = new Income({
            title,
            date: parsedDate,
            dueDate: parsedDueDate,
            description,
            amount,
            member
        });

        const ownerData = await Owner.find();
        const tenantData = await Tenant.find();
        const residentList = [...ownerData, ...tenantData];

        const residentsWithStatus = residentList.map((resident) => ({
            resident: resident._id,
            paymentStatus: "pending",
            residentType: resident.Resident_status,
            paymentMode: "cash",
        }));

        income.members = residentsWithStatus;
        await income.save();

    const adminData = await User.find({ role: "admin" });

    const ownerUsers = ownerData.map((owner) => ({ _id: owner._id, model: "Owner" }));
    const tenantUsers = tenantData.map((tenant) => ({ _id: tenant._id, model: "Tenant" }));
    const adminUsers = adminData.map((admin) => ({ _id: admin._id, model: "User" }));

    const allUsers = [...ownerUsers, ...tenantUsers, ...adminUsers];

    // Create the notification
    const notification = new Notification({
      title:  `${title}`,
      name: "System",
      message: `A new income record has been added: ${title}. Amount: ₹${amount}`,
      users: allUsers, 
    });

    await notification.save();

        return res.status(200).json({
            success: true,
            message: "Income and notification created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

//get income

exports.GetIncome = async (req, res) => {
  try {

      const income = await Income.find().populate("members.resident");

      if (!income || income.length === 0) {
          return res.status(400).json({
              success: false,
              message: "No income data found",
          });
      }

      const totalIncome = income.reduce((sum, entry) => sum + (entry.amount || 0), 0);

      return res.status(200).json({
          success: true,
          Income: income,
         
      });
  } catch (error) {
      console.error("Error fetching Income:", error);
      return res.status(500).json({
          success: false,
          message: "Error fetching Income",
      });
  }
};

//get by id income
exports.GetByIdIncome = async (req, res) => {
    try {
      
      const income = await Income.findById(req.params.id).populate("members.resident");
  
      if (!income) {
        return res.status(404).json({
          success: false,
          message: "Income record not found",
        });
      }
  
      
      income.members = income.members.filter(member => member.paymentStatus === "done");
  
      return res.status(200).json({
        success: true,
        Income: income,
      });
    } catch (error) {
      console.error("Error fetching Income by ID:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching Income",
      });
    }
  };
//delete income
exports.DeleteIncome =async (req,res)=>{
    try {
        const  income= await Income.findByIdAndDelete(req.params.id)
        return res.status(200).json({
          success: true,
          message:"Income deleted"
        });
      } catch (error) {
        console.error("Error fetching Income:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Income",
        });
      }
}
//update income
exports.UpdateIncome = async (req, res) => {
    try {
        const { title, date, dueDate, description, amount, member } = req.body;
        
        if (!title || !date || !dueDate || !description || !amount) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const parsedDate = moment(date, "DD/MM/YYYY").toDate();
        const parsedDueDate = moment(dueDate, "DD/MM/YYYY").toDate();

        if (isNaN(parsedDate) || isNaN(parsedDueDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use DD/MM/YYYY"
            });
        }

        const income = await Income.findByIdAndUpdate(
            req.params.id,
            { title, date: parsedDate, dueDate: parsedDueDate, description, amount, member },
            { new: true }
        );

        if (!income) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Income Successfully updated"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

//update and get payment
// exports.updateResidentIncomePaymentMode = async (req, res) => {
//     const { incomeId } = req.params; 
//     const { paymentMode } = req.body; 
//     const residentId = req.user.id; 
  
//     try {
//       const incomeRecord = await Income.findOne({
//         _id: incomeId,
//         "members.resident": residentId,
//       });
  
//       if (!incomeRecord) {
//         return res.status(404).json({
//           success: false,
//           message: "Income record or resident not found",
//         });
//       }

//       const memberToUpdate = incomeRecord.members.find(
//         (member) => member.resident.toString() === residentId
//       );
  
//       if (!memberToUpdate) {
//         return res.status(404).json({
//           success: false,
//           message: "Resident not found in income members",
//         });
//       }

//       memberToUpdate.paymentMode = paymentMode;
//       memberToUpdate.paymentStatus = "done";   
  
//       await incomeRecord.save();

//       const populatedIncomeRecord = await incomeRecord.populate("members.resident");
  
//       return res.status(200).json({
//         success: true,
//         message: "Payment mode and status have been successfully updated for the resident.",
//         updatedIncome: populatedIncomeRecord,
//       });
      
//     } catch (error) {
//       console.error("Error updating payment mode:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error updating payment mode",
//       });
//     }
//   };
exports.updateResidentIncomePaymentMode = async (req, res) => { 
  const { incomeId } = req.params;
  const { paymentMode, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  const residentId = req.user.id;

  try {
    // Fetch income record
    const incomeRecord = await Income.findOne({
      _id: incomeId,
      "members.resident": residentId,
    });

    if (!incomeRecord) {
      return res.status(404).json({
        success: false,
        message: "Income record or resident not found",
      });
    }

    const memberToUpdate = incomeRecord.members.find(
      (member) => member.resident.toString() === residentId
    );

    if (!memberToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Resident not found in income members",
      });
    }

    const Income_Amount = memberToUpdate.amount; // Assume 'amount' holds the payment amount for the resident.

    // Step 1: Create Razorpay Order if order ID is not provided
    if (!razorpayOrderId) {
      const razorpayOrder = await razorpay.orders.create({
        amount: Income_Amount * 100, // Convert to paisa
        currency: "INR",
        receipt: `receipt_income_${incomeId}_${residentId}`,
      });

      return res.status(200).json({
        success: true,
        razorpayOrderId: razorpayOrder.id,
        amount: Income_Amount,
        message: "Razorpay order created successfully",
      });
    }

    // Step 2: Validate Razorpay Payment
    if (razorpayPaymentId && razorpaySignature) {
      const generatedSignature = crypto
        .createHmac("sha256", process.env.key_secret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

      // Check if generated signature matches the provided signature
      if (generatedSignature !== razorpaySignature) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed. Invalid signature.",
        });
      }

      // Step 3: Update Payment Status in Income Record
      memberToUpdate.paymentMode = paymentMode || "Razorpay";
      memberToUpdate.paymentStatus = "done";

      await incomeRecord.save();

      const populatedIncomeRecord = await incomeRecord.populate("members.resident");

      return res.status(200).json({
        success: true,
        message: "Payment mode and status have been successfully updated for the resident.",
        updatedIncome: populatedIncomeRecord,
      });
    }

    // Step 4: Incomplete Payment Details
    return res.status(400).json({
      success: false,
      message: "Incomplete payment details provided.",
    });
  } catch (error) {
    console.error("Error updating payment mode:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating payment mode",
    });
  }
};

// get incomr done
exports.getCompletedIncomeRecords = async (req, res) => {
    try {

      const incomeRecords = await Income.find({
        "members.paymentStatus": "done"
      }).populate("members.resident");
  
      const filteredIncome = incomeRecords.map(record => ({
        ...record.toObject(),
        members: record.members.filter(member => member.paymentStatus === "done"),
      }));
  
      return res.status(200).json({
        success: true,
        message: "Successfully fetched income records with completed payments.",
        income: filteredIncome,
      });
    } catch (error) {
      console.error("Error fetching Income records:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching Income records.",
      });
    }
};

//FindByIdUserAndMaintance
exports.fetchUserPendingIncome = async (req, res) => {
  try {
      const loggedInUserId = req.user?.id;
      if (!loggedInUserId) {
          return res.status(400).json({
              success: false,
              message: "User authentication is required to fetch pending income records.",
          });
      }
      const incomeRecords = await Income.find({
          "members.resident": loggedInUserId,
      }).populate({
          path: 'members.resident',
      });

      if (!incomeRecords || incomeRecords.length === 0) {
          return res.status(404).json({
              success: false,
              message: "No income records found for the logged-in user.",
          });
      }

      const filteredRecords = incomeRecords
          .map(record => {
              if (Array.isArray(record.members)) {
                  record.members = record.members.filter(
                      member =>
                          member.resident &&
                          String(member.resident._id) === loggedInUserId &&
                          member.paymentStatus === "pending"
                  );
              }
              return record;
          })
          .filter(record => record.members && record.members.length > 0); 

      if (filteredRecords.length === 0) {
          return res.status(404).json({
              success: false,
              message: "No pending income records found for the logged-in user.",
          });
      }

      return res.status(200).json({
          success: true,
          pendingIncomes: filteredRecords,
      });
  } catch (error) {
      console.error("Error occurred while fetching pending incomes:", error.message);
      return res.status(500).json({
          success: false,
          message: "An unexpected error occurred while retrieving pending income records. Please try again later.",
      });
  }
};

// get total income amount
exports.GetTotalIncomeAmount = async (req, res) => {
  try {
      
      const totalAmount = await Income.aggregate([
          {
              $group: {
                  _id: null, 
                  total: { $sum: "$amount" }, 
              },
          },
      ]);

      if (!totalAmount || totalAmount.length === 0) {
          return res.status(400).json({
              success: false,
              message: "No Income found to calculate the total amount",
          });
      }

      return res.json({
          success: true,
          totalAmount: totalAmount[0].total, 
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Failed to calculate total Income amount",
      });
  }
};
