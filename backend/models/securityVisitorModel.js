const { Schema, model } = require("mongoose");

const visitorschema= new Schema({
    visitor_Name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    wing:{
        type:String,
        required:true
    },
    unit:{
        type:Number,
        required:true
    },
   time: {
    type: String,
    required:true
    // default: function() {
    //   const now = new Date();
    //   const hours = now.getHours();
    //   const minutes = now.getMinutes().toString().padStart(2, "0");
    //   const ampm = hours >= 12 ? "PM" : "AM";
    //   const formattedHours = hours % 12 || 12; 
    //   return `${formattedHours}:${minutes} ${ampm}`;
    // }
  }
},{timestamps:true})

const Visitor= model("Visitor",visitorschema)
module.exports=Visitor;