const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    Amount: {
        type: String,
        required: true,
    },
    Upload_Bill:{
        type: String,
        required:true
    },
    Original_FileName:{
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'resident' 
    },
}, {
    timestamps: true 
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;