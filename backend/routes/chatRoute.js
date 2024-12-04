const express = require('express');
const { createMessage, getMessages } = require('../controller/chatcontroller');
const router = express.Router();
const upload=require("../utils/expensesImage")


// Route to create a new chat message
router.post('/create' ,upload.fields([{ name: 'media', maxCount: 1 },]),createMessage);

// Route to get messages between two users
router.get('/messages', getMessages);

module.exports = router;
