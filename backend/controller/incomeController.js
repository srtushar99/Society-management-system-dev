const Income = require("../models/incomeModel");
const moment = require('moment');
const Owner = require("../models/ownerModel");
const Tenant = require("../models/tenantModel");

// CreateIncome function
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

        return res.status(200).json({
            success: true,
            message: "Income Successfully Added"
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
// exports.GetIncome = async (req, res) => {
//   try {
//     const income = await Income.find().populate("members.resident");
//     return res.status(200).json({
//       success: true,
//       Income: income,
//     });
//   } catch (error) {
//     console.error("Error fetching Income:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching Income",
//     });
//   }
// };
exports.GetIncome = async (req, res) => {
  try {
      // Fetch all income entries
      const income = await Income.find().populate("members.resident");

      if (!income || income.length === 0) {
          return res.status(400).json({
              success: false,
              message: "No income data found",
          });
      }

      // Calculate total income amount
      const totalIncome = income.reduce((sum, entry) => sum + (entry.amount || 0), 0);

      return res.status(200).json({
          success: true,
          Income: income,
          totalIncome: totalIncome, // Include the calculated total income amount
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
exports.updateResidentIncomePaymentMode = async (req, res) => {
    const { incomeId } = req.params; // Income record ID
    const { paymentMode } = req.body; // New payment mode
    const residentId = req.user.id; // ID of the logged-in resident
  
    console.log("Resident ID from user:", residentId);
    console.log("Request body:", req.body);
  
    try {
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

      memberToUpdate.paymentMode = paymentMode;
      memberToUpdate.paymentStatus = "done";   
  
      // Save the updated income record
      await incomeRecord.save();

      const populatedIncomeRecord = await incomeRecord.populate("members.resident");
  
      return res.status(200).json({
        success: true,
        message: "Payment mode and status have been successfully updated for the resident.",
        updatedIncome: populatedIncomeRecord,
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
      // Find income records with at least one member having paymentStatus: "done"
      const incomeRecords = await Income.find({
        "members.paymentStatus": "done"
      }).populate("members.resident");
  
      // Filter members to include only those with paymentStatus: "done"
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
      const loggedInUserId = req.user?.id; // Safely access `req.user`
      if (!loggedInUserId) {
          return res.status(400).json({
              success: false,
              message: "User authentication is required to fetch pending income records.",
          });
      }

      console.log("Fetching pending incomes for User ID:", loggedInUserId);

      // Retrieve income records for the logged-in user
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

      // Filter income records to include only pending payments for the logged-in user
      const filteredRecords = incomeRecords
          .map(record => {
              // Safely filter `members` to only include relevant entries
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
          .filter(record => record.members && record.members.length > 0); // Discard records with no relevant members

      if (filteredRecords.length === 0) {
          return res.status(404).json({
              success: false,
              message: "No pending income records found for the logged-in user.",
          });
      }

      // Return the filtered pending income records
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
      // Ensure Amount is a Number in the schema, not a String.
      const totalAmount = await Income.aggregate([
          {
              $group: {
                  _id: null, // No grouping, calculate a total
                  total: { $sum: "$amount" }, // Sum the Amount field
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
          totalAmount: totalAmount[0].total, // Send the total value
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Failed to calculate total Income amount",
      });
  }
};
