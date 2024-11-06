const mongoose = require('mongoose');

const OtherIncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true 
});

const OtherIncome = mongoose.model('OtherIncome', OtherIncomeSchema);

module.exports = OtherIncome;
