const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    Announcement_Type: {
        type: String,
        required: true,
        enum: ['Event','Activity'] 
    },
    Announcement_Title: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    Announcement_Date: {
        type: Date,
        required: true,
    },
    Announcement_Time: {
        type: String,
        required: true,
    },
    Members:[{
        participent: {
          type: mongoose.SchemaTypes.ObjectId,
          refPath: 'Members.residentType', 
          
        },
        residentType: {
          type: String,
          enum: ["Owner", "Tenant"], 
        },
    }],
}, {
    timestamps: true 
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;
