const Expenses = require('../models/expensesModel'); // Adjust path as necessary
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")

exports.createExpense = async (req, res) => {
    try {

        const {
            Title,
            Description,
            Date,
            Amount,
            Original_FileName,
            role,
        } = req.body;
                        
        
               const uploadAndDeleteLocal = async (fileArray) => {
                if (fileArray && fileArray[0]) {
                    const filePath = fileArray[0].path;
                    try {
                        // Upload to Cloudinary
                        const result = await cloudinary.uploader.upload(filePath);
                        // Delete from local server
                        fs.unlink(filePath, (err) => {
                            if (err) console.error("Error deleting file from server:", err);
                            else console.log("File deleted from server:", filePath);
                        });
                        return result.secure_url;
                    } catch (error) {
                        console.error("Error uploading to Cloudinary:", error);
                        throw error;
                    }
                }
                return '';
            };
    
            // Upload images to Cloudinary and delete local files
            const Upload_Bill = await uploadAndDeleteLocal(req.files?.Upload_Bill);
 
    
        // Create a new owner document
        const newExpenses = new Expenses({
            Title,
            Description,
            Date,
            Amount,
            Upload_Bill,
            Original_FileName,
            role:role || "resident",
            
        });

      
        await newExpenses.save();
        
        // Send success response
       return res.status(201).json({
            success: true,
            message: "Expenses data added successfully",
            
        });
    } catch (error) {
        console.error("Error adding expenses data:", error);
       return res.status(500).json({
            success: false,
            message: "Failed to add Expenses data"
        });
    }
};

// get all expenses
exports.GetAllExpenses = async (req, res) => {
    try {
        // Fetch all expenses
        const find = await Expenses.find();

        if (!find || find.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data found",
            });
        }

        // Calculate total expenses amount
        const totalAmount = find.reduce((sum, expense) => sum + expense.Amount, 0);

        return res.json({
            success: true,
            expenses: find,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve expenses data",
        });
    }
};


// Get Expense by ID
exports.GetExpenseById = async (req, res) => {
    try {
        const expense = await Expenses.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }
        return res.json({
            success: true,
            expense
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve expense data"
        });
    }
};

// Update Expense
const uploadAndDeleteLocal = async (fileArray) => {
    if (fileArray && fileArray[0]) {
        const filePath = fileArray[0].path;
        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath);
            // Delete from local server
            fs.unlink(filePath, (err) => {
                if (err) console.error("Error deleting file from server:", err);
                else console.log("File deleted from server:", filePath);
            });
            return result.secure_url;
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw error;
        }
    }
    return '';
};

exports.UpdateExpense = async (req, res) => {
    try {
        const { Title, Description, Date, Amount,Original_FileName, role } = req.body;

        let uploadUrl;
        if (req.files?.Upload_Bill) {
            uploadUrl = await uploadAndDeleteLocal(req.files?.Upload_Bill); // Upload new file
        }

        const updatedExpense = await Expenses.findByIdAndUpdate(
            req.params.id,
            {
                Title,
                Description,
                Date,
                Amount,
                Upload_Bill: uploadUrl || req.body.Upload_Bill,
                Original_FileName,
                role: role || "resident",
            },
            { new: true } // Return updated document
        );

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.json({
            success: true,
            message: "Expense updated successfully",
            updatedExpense
        });
    } catch (error) {
        console.error("Error updating expense data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update expense data"
        });
    }
};

// Delete Expense
exports.DeleteExpense = async (req, res) => {
    try {
        const expense = await Expenses.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        // Optionally delete the associated image from Cloudinary if needed
        if (expense.Upload_Bill) {
            const publicId = expense.Upload_Bill.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId); // Delete from Cloudinary
        }

        return res.json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting expense data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete expense data"
        });
    }
};

// get Total amount
exports.GetTotalExpensesAmount = async (req, res) => {
    try {
        // Ensure Amount is a Number in the schema, not a String.
        const totalAmount = await Expenses.aggregate([
            {
                $group: {
                    _id: null, // No grouping, calculate a total
                    total: { $sum: "$Amount" }, // Sum the Amount field
                },
            },
        ]);

        if (!totalAmount || totalAmount.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No expenses found to calculate the total amount",
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
            message: "Failed to calculate total expenses amount",
        });
    }
};

