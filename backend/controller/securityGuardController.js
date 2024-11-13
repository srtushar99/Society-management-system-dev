const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const moment = require('moment'); 
const Security = require('../models/securityGuardModel'); // Assuming you have a model for Security

// Helper function to upload a file to Cloudinary and delete the local file
const uploadAndDeleteLocal = async (fileArray) => {
    if (fileArray && fileArray[0]) {
        const filePath = fileArray[0].path;
        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath);
            // Delete the local file after uploading to Cloudinary
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

// Controller to create a new security record

exports.createSecurity = async (req, res) => {
    try {
        const { First_Name, Phone_Number, Gender, Shift, Shift_Date, Shift_Time, Aadhar_Card } = req.body;

        // Parse Shift_Date to a JavaScript Date object using moment.js
        const parsedDate = moment(Shift_Date, "DD/MM/YYYY", true);
        
        // Validate the date format
        if (!parsedDate.isValid()) {
            return res.status(400).json({
                success: false,
                message: "Invalid Shift_Date format. Expected format is DD/MM/YYYY."
            });
        }

        // Convert parsed date to a JavaScript Date object
        const formattedDate = parsedDate.toDate();

        // Upload Security Photo and Aadhar Card images to Cloudinary
        const Security_Photo_URL = await uploadAndDeleteLocal(req.files?.Security_Photo);
        const Aadhar_Card_URL = await uploadAndDeleteLocal(req.files?.Aadhar_Card);

        // Create a new security record with URLs from Cloudinary
        const newSecurity = new Security({
            Security_Photo: Security_Photo_URL,
            First_Name,
            Phone_Number,
            Gender,
            Shift,
            Shift_Date: formattedDate, // Use the correctly formatted Date object
            Shift_Time,
            Aadhar_Card: Aadhar_Card_URL,
        });

        // Save the new security record to the database
        await newSecurity.save();

        return res.status(201).json({
            success: true,
            message: "Security record added successfully",
        });
    } catch (error) {
        console.error("Error adding security record:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add security record"
        });
    }
};


// Controller to get all security records
exports.GetAllSecurity = async (req, res) => {
    try {
        const securityRecords = await Security.find();
        if (!securityRecords || securityRecords.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No security records found"
            });
        }
        return res.json({
            success: true,
            securityRecords: securityRecords
        });
    } catch (error) {
        console.error("Error retrieving security records:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve security records"
        });
    }
};

exports.GetSecurityById = async (req, res) => {
    try {
        const security = await Security.findById(req.params.id);
        if (!security) {
            return res.status(404).json({
                success: false,
                message: "Security record not found"
            });
        }
        return res.json({
            success: true,
            security
        });
    } catch (error) {
        console.error("Error retrieving security record by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve security record"
        });
    }
};

// Update Security record by ID

exports.updateSecurity = async (req, res) => {
    try {
        const { First_Name, Phone_Number, Gender, Shift, Shift_Date, Shift_Time } = req.body;

        // Parse Shift_Date to a JavaScript Date object using moment.js
        let formattedDate;
        if (Shift_Date) {
            const parsedDate = moment(Shift_Date, "DD/MM/YYYY", true);
            
            // Validate the date format
            if (!parsedDate.isValid()) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Shift_Date format. Expected format is DD/MM/YYYY."
                });
            }

            // Convert parsed date to a JavaScript Date object
            formattedDate = parsedDate.toDate();
        }

        // Upload new images if provided
        const Security_Photo_URL = req.files?.Security_Photo
            ? await uploadAndDeleteLocal(req.files.Security_Photo)
            : undefined;
        const Aadhar_Card_URL = req.files?.Aadhar_Card
            ? await uploadAndDeleteLocal(req.files.Aadhar_Card)
            : undefined;

        // Create the update object with conditionally added fields
        const updateData = {
            First_Name,
            Phone_Number,
            Gender,
            Shift,
            Shift_Time,
            ...(formattedDate && { Shift_Date: formattedDate }),
            ...(Security_Photo_URL && { Security_Photo: Security_Photo_URL }),
            ...(Aadhar_Card_URL && { Aadhar_Card: Aadhar_Card_URL }),
        };

        // Find and update the security record by ID
        const updatedSecurity = await Security.findByIdAndUpdate(req.params.id, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (!updatedSecurity) {
            return res.status(404).json({
                success: false,
                message: "Security record not found",
            });
        }

        return res.json({
            success: true,
            message: "Security record updated successfully",
            data: updatedSecurity,
        });
    } catch (error) {
        console.error("Error updating security record:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update security record",
        });
    }
};



// Delete Security record by ID
exports.deleteSecurity = async (req, res) => {
    try {
        const securityRecord = await Security.findById(req.params.id);
        
        if (!securityRecord) {
            return res.status(404).json({
                success: false,
                message: "Security record not found",
            });
        }

        // Delete images from Cloudinary if URLs exist
        if (securityRecord.Security_Photo) {
            const publicId = securityRecord.Security_Photo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        if (securityRecord.Aadhar_Card) {
            const publicId = securityRecord.Aadhar_Card.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        // Delete the record from the database
        await securityRecord.deleteOne();

        return res.json({
            success: true,
            message: "Security record deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting security record:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete security record",
        });
    }
};
