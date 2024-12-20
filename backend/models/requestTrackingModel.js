const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    Requester_name: {
        type: String,
        required: true,
        trim: true,
    },
    Request_name: {
        type: String,
        required: true,
        trim: true,
    },
    Request_date: {
        type: Date,
        required: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    Wing:{
        type:String,
        required:true
    },
    Unit:{
        type:Number,
        required:true,
    },
    Priority:{
        type:String,
        required:true,
        enum: ['High', 'Medium', 'Low']
    },
    Status:{
        type:String,
        required:true,
        enum: ['Open', 'Pending', 'Solve']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'createdByType', 
        require:true
    },
    createdByType: {
        type: String, 
        enum: ['Owner', 'Tenant',"User"] 
    }
}, {
    timestamps: true 
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
