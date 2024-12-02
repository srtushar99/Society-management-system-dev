const mongoose = require('mongoose');

// Define the schema for chat messages
const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId, 
      refPath: 'senderModel',              
      required: true,
    },
    senderModel: {
      type: String,
      required: true,
      enum: ['Owner', 'Tenant'],           
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId, 
      refPath: 'receiverModel',             
      required: true,
    },
    receiverModel: {
      type: String,
      required: true,
      enum: ['Owner', 'Tenant'],         
    },
    message: {
      type: String,
      required: true,                     
    },
    media: {
      type: String,                      
    },
    timestamp: {
      type: Date,
      default: Date.now,            
    },
  },
  { timestamps: true }              
);

// Create the Chat model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
