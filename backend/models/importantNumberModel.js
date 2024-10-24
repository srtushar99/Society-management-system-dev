const mongoose = require('mongoose');

const importantNumberSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, 
      },
      work: {
        type: String,
        required: true, 
      }
}, { timestamps: true }); 

module.exports = mongoose.model('ImportantNumber', importantNumberSchema);
