const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../config/auth");
const otpGenerator = require('otp-generator');
const crypto = require("crypto");
const senData = require("../config/nodemailer"); // Adjust the path accordingly
const Owner = require("../models/ownerModel");
const Tenant = require("../models/tenantModel");
const Guard = require("../models/securityGuardModel");
const { hash } = require("../utils/hashpassword");
const { compare } = require("../utils/compare");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const OTP_EXPIRATION_TIME = 60 * 1000; 




// Registration page

exports.Registration = async (req, res) => {
  try {
    const { First_Name, Last_Name, Email_Address, Phone_Number, Country, State, City,select_society, Password, Confirm_password ,role} = req.body;

    if (!First_Name || !Last_Name || !Email_Address || !Phone_Number || !Country || !State || !City || !select_society || !Password || !Confirm_password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (Password !== Confirm_password) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email_Address)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ Email_Address });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(Password, salt);

    const newUser = new User({
      First_Name,
      Last_Name,
      Email_Address,
      Phone_Number,
      Country,
      State,
      City,
      select_society,
      Password: hashedPassword,  
      Confirm_password: hashedPassword,
      role  
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    // Return all user fields except Password in the response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        First_Name: newUser.First_Name,
        Last_Name: newUser.Last_Name,
        Email_Address: newUser.Email_Address,
        Phone_Number: newUser.Phone_Number,
        Country: newUser.Country,
        State: newUser.State,
        City: newUser.City,
        select_society: newUser.select_society
      },
    });

  } catch (error) {
    console.log("Error in registration controller:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login Page

exports.login = async (req, res) => {
  try {
    const { EmailOrPhone, password } = req.body;

    // Validate input
    if (!EmailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and password are required",
      });
    }

    // Build query to find account
    let query = {};
    if (EmailOrPhone.includes("@")) {
      query = {
        $or: [
          { Email_Address: EmailOrPhone },
          { MailOrPhone: EmailOrPhone },
          { Email_address: EmailOrPhone },
        ],
      };
    } else {
      query = {
        $or: [
          { Phone_Number: EmailOrPhone },
          { MailOrPhone: EmailOrPhone },
          { Phone_number: EmailOrPhone },
        ],
      };
    }

    // Search for the account across all models
    const account =
      (await Owner.findOne(query)) ||
      (await Tenant.findOne(query)) ||
      (await User.findOne(query)) ||
      (await Guard.findOne(query));

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Invalid Account credential",
      });
    }

    // Validate password (check if Password exists and is not undefined)
    if (!account.Password) {
      return res.status(500).json({
        success: false,
        message: "Account password is not set correctly",
      });
    }


    const isPasswordValid = await compare(password, account.Password); 

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password credentials",
      });
    }

    // Generate JWT token and set cookie
    // generateTokenAndSetCookie(account._id, res);
    const token = generateTokenAndSetCookie(account, res);

    // Exclude password and send success response
    const { Password, ...safeUserDetails } = account._doc || account;
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
      user: safeUserDetails,
    });

  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Logout page 
exports.logout = async (req, res) => {
  try {
    res.clearCookie("Society-Management", {
            path: "/",
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const id = req.params.id;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    const account =
      (await User.findOne({ Email: email })) ||
      (await Guard.findOne({ MailOrPhone: email })) ||
      (await Owner.findOne({ Email_address: email })) || 
      (await Tenant.findOne({ Email_address: email }))


    if (!account) {
      return res.status(404).json({
        success: false,
        message: "User  not found",
      });
    }

    const hashedPassword = await hash(newPassword);

    account.Password = hashedPassword;
    await account.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Find user by ID 

exports.findUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user and populate the 'select_society' field
    const user = await User.findById(userId).populate('select_society', 'Society_name');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User found',
      data: {
        id: user._id,
        First_Name: user.First_Name,
        Last_Name: user.Last_Name,
        Email_Address: user.Email_Address,
        Phone_Number: user.Phone_Number,
        Country: user.Country,
        State: user.State,
        City: user.City,
        Society: user.select_society ? user.select_society.Society_name : null,
      },
    });
  } catch (err) {
    console.error("Error finding user:", err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};


// // find by id 
// exports.FindByIdProfile = async (req, res) => {
//   try {
//     const find = await User.findById(req.params.id, {
//       otp: 0,
//       otpExpiration: 0,
//     });
//     if (!find) {
//       return res.status(400).json({
//         success: false,
//         message: "No Data Found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       Profile: find,
//     });
//   } catch (error) {
//     console.log("Error in logout controller", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// Send Otp 

exports.SendOtp = async (req, res) => {
  try {
      const { EmailOrPhone } = req.body;
      const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
      const currentTime = new Date();

      let account = await User.findOne({ $or: [{ Email_Address: EmailOrPhone }, { Phone_Number: EmailOrPhone }] });
      if (!account) {
        account = await Guard.findOne({ $or: [{ MailOrPhone: EmailOrPhone }, { MailOrPhone: EmailOrPhone }] });
      }
      if (!account) {
        account = await Owner.findOne({ $or: [{ Email_address: EmailOrPhone }, { Phone: EmailOrPhone }] });
      }
      if (!account) {
        account = await Tenant.findOne({ $or: [{ Email_address: EmailOrPhone }, { Phone: EmailOrPhone }] });
      }

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Email or phone number is not registered",
      });
    }

    if (account.otpExpiration && account.otpExpiration > currentTime) {
      return res.status(400).json({
        success: false,
        message: "Current OTP is still valid. Please wait for it to expire.",
      });
    }

    const otpExpiration = new Date(currentTime.getTime() + OTP_EXPIRATION_TIME);
    account.otp = otp;
    account.otpExpiration = otpExpiration;
    await account.save();

    if (EmailOrPhone.includes("@")) {
      // Send OTP via email
       await senData(account.Email_address || account.MailOrPhone || account.Email_address , "forget your password" , "forget otp is ",otp);

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to email",
      });
    } else {
      // Send OTP via SMS
      // await twilioClient.messages.create({
      //   body: `Your forgot password OTP is ${otp}`,
      //   to: EmailOrPhone,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      // });
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to phone number",
      });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// verify Otp 

exports.verifyOtp = async (req, res) => {
  try {
    const { EmailOrPhone, otp } = req.body;
    console.log("Provided OTP:", otp);

    if (!EmailOrPhone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and OTP are required",
      });
    }

    let account;
    if (EmailOrPhone.includes("@")) {
      account =
        (await User.findOne({ Email_address: EmailOrPhone })) ||
        (await Guard.findOne({ MailOrPhone: EmailOrPhone })) ||
        (await Owner.findOne({ Email_address: EmailOrPhone })) ||
        (await Tenant.findOne({ Email_address: EmailOrPhone }));
    } else {
      account =
        (await User.findOne({ Phone_Number: EmailOrPhone })) ||
        (await Guard.findOne({ MailOrPhone: EmailOrPhone })) ||
        (await Owner.findOne({ Phone_number: EmailOrPhone })) ||
        (await Tenant.findOne({ Phone_number: EmailOrPhone }));
    }

    if (!account) {
      console.log("No account found for:", EmailOrPhone);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Fetched account:", account);

    // Check if OTP exists in the fetched account
    if (!account.otp) {
      console.error("OTP is not set in the account.");
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Validate OTP
    // if (String(account.otp) !== String(otp)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid OTP",
    //   });
    // }
    //      // Check if OTP matches
         if (account.otp !== otp) {
          return res.status(400).json({
              success: false,
              message: "Invalid OTP"
          });
      }

    // Check for OTP expiration
    const currentTime = new Date();
    if (account.otpExpiration && currentTime > account.otpExpiration) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


exports.editProfile = async (req, res) => {
  try {
    const {
      First_Name,
      Last_Name,
      Email_Address,
      Phone_Number,
      Country,
      State,
      City,
      select_society,
    } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email_Address)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    let imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles",
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = result.secure_url;
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        First_Name,
        Last_Name,
        Email_Address,
        Phone_Number,
        Country,
        State,
        City,
        select_society,
        profileImage: imageUrl,
      },
      { new: true }
    );

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("error a deleting file", err);
      } else {
        console.log("file  deleted from server");
      }
    });
    if (user) {
      res.status(200).json({
        success: true,
        message: "User  Profile Updated...",
      });
    }
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};