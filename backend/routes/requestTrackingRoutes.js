const express = require('express');
const { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest, getUserRequest } = require('../controller/requestTrackingController');
const { authenticate } = require('../middleware/authenticate ');
const router = express.Router();

router.post('/addrequest',authenticate, createRequest);
router.get('/', getAllRequests);
router.get('/:id', getRequestById);
router.put('/updaterequest/:id', updateRequest);
router.delete('/deleterequest/:id', deleteRequest);
//get user request
router.get("/find/getuserrequest",authenticate,getUserRequest)

module.exports = router;
