const Chat = require('../models/chatModel');
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")
// exports.createMessage = async (req, res) => {
//   const { senderId, senderModel, receiverId, receiverModel, message, media } = req.body;

//   try {
//     const newMessage = await Chat.create({
//       senderId,
//       senderModel,
//       receiverId,
//       receiverModel,
//       message,
//       media,
//     });

//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// create message 
exports.createMessage = async (req, res) => {
  const { senderId, senderModel, receiverId, receiverModel, message } = req.body;

  try {

    const mediaUrls = [];
    if (req.files?.media && Array.isArray(req.files.media)) {
      for (const file of req.files.media) {
        const uploadResult = await cloudinary.uploader.upload(file.path);
        mediaUrls.push(uploadResult.secure_url);

        fs.unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting file from server:", err);
          } else {
            console.log("File deleted from server:", file.path);
          }
        });
      }
    }

    // Create the message in the database
    const newMessage = await Chat.create({
      senderId,
      senderModel,
      receiverId,
      receiverModel,
      message,
      media: mediaUrls, // Save the Cloudinary URLs
    });

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create message",
      error: error.message,
    });
  }
};


// get messages

exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;

  console.log("Request query:", req.query);

  if (!senderId || !receiverId) {
    return res.status(400).json({ error: "senderId and receiverId are required" });
  }

  try {
 
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    console.log("Retrieved messages:", messages);

    // Respond with the retrieved messages
    res.status(200).json(messages);
  } catch (error) {
    // Log any errors that occur
    console.error("Error fetching messages:", error);

    // Respond with an error message
    res.status(500).json({ error: error.message });
  }
};
