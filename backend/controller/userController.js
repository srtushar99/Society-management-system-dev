const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../config/auth");

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

exports.login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Check if both fields are provided
    if (!emailOrPhone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate email or phone format
    if (!/^\d+$/.test(emailOrPhone) && !/\S+@\S+\.\S+/.test(emailOrPhone)) {
      return res.status(400).json({ success: false, message: "Invalid email or phone format" });
    }

    // Find user by either email or phone number
    const user = await User.findOne({
      $or: [
        { Email_Address: emailOrPhone },
        { Phone_Number: emailOrPhone }
      ]
    });

    console.log("Incoming login attempt:", emailOrPhone); // Debug log
    console.log("User found:", user); // Debug log

    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    // Check if the password matches
    const isPasswordCorrect = await bcryptjs.compare(password, user.Password);
    console.log("Password correct:", isPasswordCorrect); // Debug log

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Proceed with token generation and response
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



exports.logout = async (req, res) => {
  try {
    res.clearCookie("Society-Management");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from request parameters
    const { newPassword, confirmPassword } = req.body; // Get new password and confirm password from request body

    // Check if both fields are provided
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate that newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // Optionally, you can add a password strength validation here

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Find the user by ID and update the password
    const user = await User.findByIdAndUpdate(userId, { Password: hashedPassword }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Error in reset password controller:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
