const mongoose = require("mongoose"); 
const { Schema, model } = mongoose; 

const incomeschema= new Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    members:[{
        resident: {
          type: mongoose.SchemaTypes.ObjectId,
          refPath: 'members.residentType', 
          required: true,
        },
        residentType: {
          type: String,
          
          enum: ["Owner", "Tenant"], 
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
       
    }],
    member:{
        type:Number,
        default:0
    }

},{timestamps:true});

const Income=model("Income",incomeschema)
module.exports=Income;