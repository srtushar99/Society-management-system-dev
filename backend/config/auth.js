const jwt = require("jsonwebtoken");

exports.generateTokenAndSetCookie = (user, res) => {
  const payload = {
    userId: user._id,
    email: user.Email_Address, 
    role: user.role,  
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  
  res.cookie("Society-Management", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, 
    httpOnly: true, 
    sameSite: "strict", 
    secure: process.env.NODE_ENV !== "development", 
  });

  return token;
  // return res.status(200).json({
  //   success: true,
  //   token: token,
  //   user: user,
  // });
};


