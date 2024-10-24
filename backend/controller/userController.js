const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../config/auth");

// Registration page

exports.Registration = async (req, res) => {
  try {
    const { First_Name, Last_Name, Email_Address, Phone_Number, Country, State, City, Password, Confirm_password } = req.body;

    if (!First_Name || !Last_Name || !Email_Address || !Phone_Number || !Country || !State || !City || !Password || !Confirm_password) {
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
      Password: hashedPassword,  
      Confirm_password: hashedPassword,  
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
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!/^\d+$/.test(emailOrPhone) && !/\S+@\S+\.\S+/.test(emailOrPhone)) {
      return res.status(400).json({ success: false, message: "Invalid email or phone format" });
    }

    const user = await User.findOne({
      $or: [
        { Email_Address: emailOrPhone },
        { Phone_Number: emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.Password);
   
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      message: "Login successful! Welcome back.",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Logout page 

exports.logout = async (req, res) => {
  try {
    res.clearCookie("Society-Management");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Reset-password 

exports.resetPassword = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { newPassword, confirmPassword } = req.body; 

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const user = await User.findByIdAndUpdate(userId, { Password: hashedPassword }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Error in reset password controller:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Edit profile 

exports.editProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = {
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      Email_Address: req.body.Email_Address,
      Phone_Number: req.body.Phone_Number,
      Country: req.body.Country,
      State: req.body.State,
      City: req.body.City,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Find user by ID 

exports.findUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found', data: user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
