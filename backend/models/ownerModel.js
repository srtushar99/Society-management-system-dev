const { default: mongoose } = require("mongoose");

const OwnerSchema = new mongoose.Schema({
    Full_Name: {
        type: String,
        required: true,
    },
    Phone_Number: {
        type: Number,
        required: true,
    },
    Email_Address: {
        type: String,
        required: true, 
    },
    Age:{
        type: Number,
        required:true,
    },
    Gender:{
        type: String,
        required:true,
    },
    Wing:{
        type: String,
        required:true,
    },
    Unit:{
        type: String,
        required:true,
    },
    Relation:{
        type: String,
        required:true,
    },

}, 
    { timestamps: true });  

const Owner = mongoose.model('Owner', OwnerSchema);
module.exports = Owner;
