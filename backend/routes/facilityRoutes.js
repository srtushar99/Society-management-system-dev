const express = require('express');
const { createFacility, getAllFacilities, getFacilityById, updateFacility } = require('../controller/facilityController');
const router = express.Router();

// add facility
router.post('/addfacility', createFacility);

// get facility
router.get('/', getAllFacilities);

// get by id facility
router.get('/:id', getFacilityById);

// update facility
router.put('/updatefacility/:id', updateFacility);

module.exports = router;
