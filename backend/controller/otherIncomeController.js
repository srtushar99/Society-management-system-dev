const OtherIncome = require('../models/otherIncomeModel');

exports.createOtherIncome = async (req, res) => {
    try {
        // Destructure required fields from the request body
        const { title, date, dueDate, description, amount } = req.body;

        // Check if all required fields are provided
        if (!title || !date || !dueDate || !description || amount == null) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: title, date, dueDate, description, and amount.'
            });
        }

        // Create a new OtherIncome entry
        const otherIncome = new OtherIncome({
            title,
            date: new Date(date),        // Convert date strings to Date objects
            dueDate: new Date(dueDate),
            description,
            amount
        });

        // Save the new entry to the database
        await otherIncome.save();

        // Respond with success message and data
        res.status(201).json({
            success: true,
            message: 'Other income added successfully',
            data: otherIncome
        });
    } catch (error) {
        console.error('Error adding other income:', error);

        // Respond with failure message
        res.status(500).json({
            success: false,
            message: 'Failed to add other income'
        });
    }
};


// Get a single "Other Income" record by ID
exports.getOtherIncomeById = async (req, res) => {
    try {
        const income = await OtherIncome.findById(req.params.id);

        if (!income) {
            return res.status(404).json({
                success: false,
                message: "Other income not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Other income retrieved successfully",
            data: income
        });
    } catch (error) {
        console.error("Error retrieving income by ID:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve other income"
        });
    }
};