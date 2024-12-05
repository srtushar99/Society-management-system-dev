const Notification = require('../models/notificationModel');

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const notifications = await Notification.find({
        "users._id": userId,
      });
  
      const formattedNotifications = notifications.map((notification) => {
        return {
          ...notification._doc,
          users: notification.users.filter(
            (user) => user._id.toString() === userId.toString()
          ),
        };
      });
  
      return res.status(200).json({
        success: true,
        notifications: formattedNotifications,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching notifications",
      });
    }
  };

// Delete all notifications
exports.deleteAllNotifications = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const result = await Notification.deleteMany({
        "users._id": userId,
      });
  
      res.status(200).json({
        success: true,
        message: `Deleted ${result.deletedCount} notifications for the user.`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting notifications",
        error: error.message,
      });
    }
  };
  

// Delete a specific notification
exports.deleteNotification = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
  
    try {
      const notification = await Notification.findOneAndDelete({
        _id: id,
        "users._id": userId,
      });
  
      if (!notification) {
        return res.status(404).json({
          success: false,
          message: "Notification not found or you do not have permission to delete it",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting notification",
        error: error.message,
      });
    }
  };
  
