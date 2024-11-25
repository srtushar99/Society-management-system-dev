const { CheckMaintenancePassword, CreateMaintenance, GetMaintenance, changePaymentDetails, fetchUserPendingMaintenance,   } = require("../controller/maintenanceController");
const { authenticate } = require("../middleware/authenticate ");
const router=require("express").Router();

//check password correction in maintenance
router.post("/checkpassword",authenticate,CheckMaintenancePassword)

//add maintenance 
router.post("/addmaintenance",CreateMaintenance)

//get maintenance
router.get("/",GetMaintenance)

//update and get payment
router.put('/:maintenanceId/resident/payment', authenticate,changePaymentDetails);

//FindByIdUserAndMaintance
router.get("/getuserandMaintance",authenticate,fetchUserPendingMaintenance)

module.exports=router