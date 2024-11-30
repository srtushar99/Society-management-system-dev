const express = require('express');
const { createAnnouncement, getAllAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement } = require('../controller/AnnoucementController');
const router = express.Router();

// add announcement
router.post('/addannouncement', createAnnouncement);

// get all announcement
router.get('/', getAllAnnouncements);

// get by id announcement
router.get('/:id', getAnnouncementById);

// update annoucement
router.put('/updateannouncement/:id', updateAnnouncement);

// delete annoucement
router.delete('/deleteannouncement/:id', deleteAnnouncement);

module.exports = router;
