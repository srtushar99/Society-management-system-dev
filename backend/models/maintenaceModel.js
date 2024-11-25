const mongoose = require("mongoose"); // Import mongoose
const { Schema, model } = mongoose; // Destructure Schema and model from mongoose

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
                refPath: 'ResidentList.residentType', // Corrected to point to the right field
                required: true,
            },
            residentType: {
                type: String,
                enum: ["Owner", "Tenante"], // Correct spelling if needed
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
