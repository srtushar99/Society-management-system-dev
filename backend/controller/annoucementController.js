const Notification = require('../models/notificationModel'); 
const Announcement = require('../models/annoucementModel'); 
const Owner = require('../models/ownerModel'); 
const Tenant = require('../models/tenantModel');
const Guard = require('../models/securityGuardModel');


// // Create a new announcement
// exports.createAnnouncement = async (req, res) => {
//     try {
//         const { Announcement_Type, Title, Description, Announcement_Date, Announcement_Time, role } = req.body;

//         if (!Announcement_Type || !Title || !Description || !Announcement_Date || !Announcement_Time) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const announcement = new Announcement({
//             Announcement_Type,
//             Title,
//             Description,
//             Announcement_Date,
//             Announcement_Time,
//             role,
//         });

//         await announcement.save();
//         res.status(201).json({ message: 'Announcement created successfully' });
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating announcement', error });
//     }
// };


exports.createAnnouncement = async (req, res) => {
    try {
        const { Announcement_Type, Announcement_Title, Description, Announcement_Date, Announcement_Time } = req.body;

        if (!Announcement_Type || !Announcement_Title || !Description || !Announcement_Date || !Announcement_Time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Step 1: Create the announcement
        const announcement = new Announcement({
            Announcement_Type,
            Announcement_Title,
            Description,
            Announcement_Date,
            Announcement_Time,
        });

        await announcement.save();

        const ownerData = await Owner.find();
        const tenantData = await Tenant.find();
        const guardData = await Guard.find();

      const ownerUsers = ownerData.map(owner => ({ _id: owner._id, model: "Owner" }));
      const tenantUsers = tenantData.map(tenant => ({ _id: tenant._id, model: "Tenant" }));
      const securityUsers = guardData.map(guard => ({ _id: guard._id, model: "Guard" }));

  
   const allUsers = [
     ...ownerUsers,
     ...tenantUsers,
     ...securityUsers
   ];

    
   const notification = new Notification({
     title: `New Activity${Announcement_Type}`,
     name: Announcement_Title,
     message: Description,
     users:allUsers
   });


   await notification.save();

        res.status(201).json({ message: 'Announcement created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating announcement and notifications', error });
    }
};

// // Get all announcements
exports.getAllAnnouncement = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving announcements', error });
    }
};
//get activity announcement
exports.GetActivityAnnouncement = async (req, res) => {
    try {
  
      const activities = await Announcement.find({
        type: "Activity",
        Members: { $exists: true, $not: { $size: 0 } },
      })
        .populate({
          path: "Members.participent",
          select: "profileImage Full_name",
        }).exec();
  
      if (!activities || activities.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No activity announcements with participants found",
        });
      }
  
      return res.status(200).json({
        success: true,
        activities,
      });
    } catch (error) {
      console.error("Error fetching activity announcements:", error);
  
      return res.status(500).json({
        success: false,
        message: "Error fetching activity announcements",
      });
    }
  };
  //get Event announcement
  exports.GetEventAnnouncement = async (req, res) => {
    try {
  
      const activities = await Announcement.find({
        type: "Event",
        Members: { $exists: true, $not: { $size: 0 } },
      })
        .populate({
          path: "Members.participent",
          select: "profileImage Full_name",
        }).exec();
  
      if (!activities || activities.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No activity announcements with participants found",
        });
      }
  
      return res.status(200).json({
        success: true,
        activities,
      });
    } catch (error) {
      console.error("Error fetching activity announcements:", error);
  
      return res.status(500).json({
        success: false,
        message: "Error fetching activity announcements",
      });
    }
  };

// Get an announcement by ID
exports.getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json({ message: 'Announcement retrieved successfully', announcement });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving announcement', error });
    }
};

// Update an announcement by ID
exports.updateAnnouncement = async (req, res) => {
    try {
        const { Announcement_Type, Announcement_Title, Description, Announcement_Date, Announcement_Time, role } = req.body;

        if (!Announcement_Type || !Announcement_Title || !Description || !Announcement_Date || !Announcement_Time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            { Announcement_Type, Announcement_Title, Description, Announcement_Date, Announcement_Time, role },
            { new: true, runValidators: true }
        );

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json({ message: 'Announcement updated successfully', announcement });
    } catch (error) {
        res.status(400).json({ message: 'Error updating announcement', error });
    }
};

// Delete an announcement by ID
exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting announcement', error });
    }
};


// Controller to fetch only "Activity" announcements
exports.getActivityAnnouncement = async (req, res) => {
    try {
        const activities = await Announcement.find({ Announcement_Type: 'Activity' });
        res.status(200).json({
            success: true,
            data: activities,
        });
    } catch (error) {
        console.error('Error fetching activity announcements:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};



