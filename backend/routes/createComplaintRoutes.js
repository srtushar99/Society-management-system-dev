const express = require('express');
const { createComplaint, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint, getUserComplaints } = require('../controller/createComplaintController');
const { authenticate } = require('../middleware/authenticate ');

const router = express.Router();

// add complaint
router.post('/addcomplaint',authenticate, createComplaint);

// get complaint
router.get('/', getAllComplaints);

// get by id complaint
router.get('/:id',authenticate, getComplaintById);

// update complaint
router.put('/updatecomplaint/:id', updateComplaint);

// delete complaint
router.delete('/deletecomplaint/:id', deleteComplaint);

//get user complaint
router.get("/find/getusercomplaint",authenticate,getUserComplaints);

module.exports = router;
