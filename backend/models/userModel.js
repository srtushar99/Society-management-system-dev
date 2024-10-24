const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: true,
  },
  Email_Address: {
    type: String,
    required: true,
    unique: true,  
  },
  Phone_Number: {
    type: String,
    required: true,
  },
  Country:{
    type: String,
    required: true,
  },
  State:{
    type: String,
    required: true,
  },
  City:{
    type: String,
    required: true,
  },
  Password:{
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
