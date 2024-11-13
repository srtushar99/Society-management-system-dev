const mongoose = require('mongoose');

const SecuritySchema = new mongoose.Schema({
  Security_Photo: {
    type: String,
    required: true,
  },
  First_Name: {
    type: String,
    required: true,
  },
  Phone_Number: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  Shift: {
    type: String,
    required: true,
    enum: ['Day', 'Night']
  },
  Shift_Date: {
    type: Date,
    required: true,
  },
  Shift_Time: {
    type: String,
    required: true,
  },
  Aadhar_Card: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Corrected: use mongoose.model instead of model
const Security = mongoose.model("Security", SecuritySchema);

module.exports = Security;
