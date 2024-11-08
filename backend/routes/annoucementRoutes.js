const express = require('express');
const { createAnnouncement, getAllAnnouncements, getAnnouncementById, updateAnnouncement } = require('../controller/AnnoucementController');
const router = express.Router();

router.post('/addannouncement', createAnnouncement);
router.get('/', getAllAnnouncements);
router.get('/:id', getAnnouncementById);
router.put('/updateannouncement/:id', updateAnnouncement);

module.exports = router;
