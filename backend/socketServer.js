const { Server } = require('socket.io'); // Importing Socket.IO Server
const Chat = require('./models/chatModel'); // Import the Chat model

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*', // Update to restrict origins as needed
      methods: ['GET', 'POST'],
    },
  });

  // Handle connection
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join room based on sender and receiver IDs
    socket.on('joinRoom', ({ senderId, receiverId }) => {
      const roomId = [senderId, receiverId].sort().join('-'); // Create unique room ID
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Listen for a new message
    socket.on('sendMessage', async (data) => {
      const { senderId, senderModel, receiverId, receiverModel, message, media } = data;

      try {
        // Save message to the database
        const newMessage = await Chat.create({
          senderId,
          senderModel,
          receiverId,
          receiverModel,
          message,
          media,
        });

        // Broadcast the message to the room
        const roomId = [senderId, receiverId].sort().join('-');
        io.to(roomId).emit('receiveMessage', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

module.exports = initializeSocket;
