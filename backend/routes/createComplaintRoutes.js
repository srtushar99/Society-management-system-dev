const express = require('express');
const { createComplaint, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint, getUserComplaints } = require('../controller/createComplaintController');
const { authenticate } = require('../middleware/authenticate ');

const router = express.Router();

router.post('/addcomplaint',authenticate, createComplaint);
router.get('/', getAllComplaints);
router.get('/:id',authenticate, getComplaintById);
router.put('/updatecomplaint/:id', updateComplaint);
router.delete('/deletecomplaint/:id', deleteComplaint);
//get user complaint
router.get("/find/getusercomplaint",authenticate,getUserComplaints)
module.exports = router;
