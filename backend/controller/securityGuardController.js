const cloudinary = require('../utils/cloudinary');
const fs = require("fs")
const crypto = require("crypto");
const { hash } = require("../utils/hashpassword");
const senData = require("../config/nodemailer");
const Guard = require("../models/securityGuardModel");
const moment = require('moment');

// add security guard


exports.CreateSecurityGuard = async (req, res) => {
    try {

        function generatePassword(length = 9) {
            // Define sets of characters
            const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const specialChar = '@'; // Fixed special character
        
            // Ensure length is at least 3 (for alphabet@number format)
            if (length < 3) {
                throw new Error('Password length must be at least 3 for this format');
            }
        
            // Generate random alphabet
            const randomAlphabet = alphabets[crypto.randomInt(0, alphabets.length)];
            // Generate random number
            const randomNumber = numbers[crypto.randomInt(0, numbers.length)];
        
            // Remaining characters (if length > 3)
            let remainingChars = '';
            const remainingLength = length - 2; // Subtract the fixed alphabet and number
            const allCharacters = alphabets + numbers;
        
            for (let i = 0; i < remainingLength; i++) {
                const randomIndex = crypto.randomInt(0, allCharacters.length);
                remainingChars += allCharacters[randomIndex];
            }
        
            return randomAlphabet + specialChar + randomNumber + remainingChars;
        }
                
        
        const {
            full_name,
            MailOrPhone,
            gender,
            shift,
            date,
            time,
            role,
        } = req.body;

        // Convert date string (DD/MM/YYYY) to Date object
        const parsedDate = moment(date, "DD/MM/YYYY").toDate();
        if (!parsedDate || isNaN(parsedDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use DD/MM/YYYY",
            });
        }

        const Password = generatePassword();
        console.log(Password);

        const hashpassword = await hash(Password);

        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    const result = await cloudinary.uploader.upload(filePath);
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

        const profileimage = await uploadAndDeleteLocal(req.files?.profileimage);
        const adhar_card = await uploadAndDeleteLocal(req.files?.adhar_card);

        if (!full_name || !MailOrPhone || !gender || !shift || !date || !time || !profileimage || !adhar_card) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newOwner = new Guard({
            full_name,
            MailOrPhone,
            gender,
            shift,
            date: parsedDate,  // Use the parsed date here
            time,
            profileimage,
            adhar_card,
            role: role || "security",
            Password: hashpassword
        });

        await newOwner.save();

        if (MailOrPhone.includes("@")) {
            await senData(
                newOwner.MailOrPhone,
                "Registration Successful - Login Details",
                `Dear ${newOwner.full_name},\n\nYou have successfully registered as a security. Your login details are as follows:\n\nUsername: ${newOwner.MailOrPhone}\nPassword: <b> ${Password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
            );
         } 
        return res.status(200).json({
            success: true,
            message: "Security Guard Successfully added"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

 
 //get a security Guard
 exports.GetSecurityGuard= async (req,res)=>{
     try {
         const find= await Guard.find();
         if(!find){
             return res.status(400).json({
                 success:false,
                 message:"No data found"
             })
         }
         return res.status(200).json({
             success:true,
             Guard:find
         })
     } catch (error) {
         console.error(error);
         return res.status(500).json({
              success: false,
              message: "error in Announcement fetching"
          });
     }
 }
 exports.GetByIdGuard= async (req,res)=>{
     try {
         const find= await Guard.findById(req.params.id);
         if(!find){
             return res.status(400).json({
                 success:false,
                 message:"No data found"
             })
         }
         return res.status(200).json({
             success:true,
             Guard:find
         })
     } catch (error) {
         console.error(error);
         return res.status(500).json({
              success: false,
              message: "error in Announcement fetching"
          });
     }
 }
 exports.DeleteGuard= async (req,res)=>{
     try {
         const find= await Guard.findByIdAndDelete(req.params.id);
         if(!find){
             return res.status(400).json({
                 success:false,
                 message:"No data found"
             })
         }
         return res.status(200).json({
             success:true,
             message:"Security Guard deleted"
         })
     } catch (error) {
         console.error(error);
         return res.status(500).json({
              success: false,
              message: "error in Announcement deleting"
          });
     }
 }

 //update security

exports.updateSecurityGuard = async (req, res) => {
    const { id } = req.params;
    const {
        full_name,
        MailOrPhone,
        gender,
        shift,
        date,
        time,
        role,
    } = req.body;

    try {
        const guard = await Guard.findById(id);
        if (!guard) {
            return res.status(404).json({
                success: false,
                message: "Security Guard not found"
            });
        }

        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    const result = await cloudinary.uploader.upload(filePath);
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file from server:", err);
                    });
                    return result.secure_url;
                } catch (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    throw error;
                }
            }
            return '';
        };

        if (full_name) guard.full_name = full_name;
        if (MailOrPhone) guard.MailOrPhone = MailOrPhone;
        if (gender) guard.gender = gender;
        if (shift) guard.shift = shift;
        if (date) {
            const parsedDate = moment(date, "DD/MM/YYYY").toDate();
            if (!parsedDate || isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date format. Use DD/MM/YYYY",
                });
            }
            guard.date = parsedDate;
        }
        if (time) guard.time = time;
        if (role) guard.role = role || guard.role;

        if (req.files?.profileimage) {
            guard.profileimage = await uploadAndDeleteLocal(req.files.profileimage);
        }

        if (req.files?.adhar_card) {
            guard.adhar_card = await uploadAndDeleteLocal(req.files.adhar_card);
        }

        await guard.save();

        return res.status(200).json({
            success: true,
            message: "Security Guard details updated successfully",
        });
    } catch (error) {
        console.error("Error updating Security Guard:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating Security Guard details",
        });
    }
};
