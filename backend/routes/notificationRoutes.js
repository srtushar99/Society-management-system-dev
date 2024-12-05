const express = require('express');
const { getAllNotifications, deleteAllNotifications, deleteNotification } = require('../controller/notificationController');
const { authenticate } = require('../middleware/authenticate ');


const router = express.Router();

// Get all notifications
router.get('/view',authenticate, getAllNotifications);

// Delete all notifications
router.delete('/deleteall',authenticate, deleteAllNotifications);

// Delete a specific notification
router.delete('/:id/deleteone',authenticate, deleteNotification);

module.exports = router;
