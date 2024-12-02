const Chat = require('../models/chatModel');

exports.createMessage = async (req, res) => {
  const { senderId, senderModel, receiverId, receiverModel, message, media } = req.body;

  try {
    const newMessage = await Chat.create({
      senderId,
      senderModel,
      receiverId,
      receiverModel,
      message,
      media,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 }); 

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
