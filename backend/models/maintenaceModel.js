const mongoose = require("mongoose"); 
const { Schema, model } = mongoose; 

const maintenanceschema = new Schema({
    Maintenance_Amount: {
        type: Number,
        required: true
    },
    Penalty_Amount: {
        type: Number,
        required: true
    },
    DueDate: {
        type: Date,
        required: true
    },
    PenaltyDay: {
        type: String,
        required: true
    },
    ResidentList: [
        {
            resident: {
                type: mongoose.SchemaTypes.ObjectId,
                refPath: 'ResidentList.residentType', 
                required: true,
            },
            residentType: {
                type: String,
                enum: ["Owner", "Tenante"], 
            },
            paymentStatus: {
                type: String,
                enum: ["pending", "done"],
                default: "pending",
            },
            paymentMode: {
                type: String,
                enum: ["online", "cash"],
                default: "cash",
            },
            penalty: {
                type: Number,
                default: 0,
            },
        },
    ],
}, { timestamps: true });

const Maintenance = model("Maintenance", maintenanceschema);
module.exports = Maintenance;
