const { Schema, default: mongoose, model } = require("mongoose");
const Owner = require('../models/ownerModel');
const Tenant = require('../models/tenantModel');
const User = require('../models/userModel');

const notificationschema= new Schema({
    title:{
        type:String
    },
    name:{
        type:String
    },
    message:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    paymentMode: {
        type: String, 
        enum: ["cash", "online"],
    },
    read:{
        type:Boolean,
        default:false
    },
    users:[{
        _id:{type:mongoose.Schema.Types.ObjectId ,  refPath: 'userModel'},
        model:{
            type:String,
            enum:["Owner","Tenant","User","Guard"]
        }
    }],
    othercontent: {
        type: String
    }
},{timestamps:true})
const Notification= model("Notification",notificationschema)
module.exports=Notification;