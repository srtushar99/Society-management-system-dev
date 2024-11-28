const mongoose = require('mongoose');

const CamplaintSchema = new mongoose.Schema({
    Complainer_name: {
        type: String,
        required: true,
        trim: true,
    },
    Complaint_name: {
        type: String,
        required: true,
        trim: true,
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
        enum: ['Owner', 'Tenante',"User"] 
    }
}, {
    timestamps: true 
});

const Camplaint = mongoose.model('Camplaint', CamplaintSchema);

module.exports = Camplaint;
