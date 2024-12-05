const express = require('express');
const { createAnnouncement, getAllAnnouncement, getAnnouncementById, updateAnnouncement, deleteAnnouncement, getActivityAnnouncement, GetActivityAnnouncement, GetEventAnnouncement} = require('../controller/AnnoucementController');
const { authenticate, IsAdmin } = require('../middleware/authenticate ');

const router = express.Router();

// add announcement
router.post('/addannouncement',authenticate,IsAdmin, createAnnouncement);

// get all announcement
router.get('/', getAllAnnouncement);

// get by id announcement
router.get('/:id', getAnnouncementById);

//get activity announcement 
router.get("/acitivity/getannouncement",GetActivityAnnouncement)

//get Event announcement 
router.get("/event/getannouncement",GetEventAnnouncement)

// update annoucement
router.put('/updateannouncement/:id', updateAnnouncement);

// delete annoucement
router.delete('/deleteannouncement/:id', deleteAnnouncement);

router.get('/getall/activities', getActivityAnnouncement);

module.exports = router;
