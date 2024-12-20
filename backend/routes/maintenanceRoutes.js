const { CheckMaintenancePassword, CreateMaintenance, GetMaintenance, fetchUserPendingMaintenance, getResidentsWithCompletedPayments, updatePaymentMode,   } = require("../controller/maintenanceController");
const { authenticate, IsAdmin } = require("../middleware/authenticate ");
const router=require("express").Router();

//check password correction in maintenance
router.post("/checkpassword",authenticate,IsAdmin,CheckMaintenancePassword)

//add maintenance 
router.post("/addmaintenance",authenticate,IsAdmin,CreateMaintenance)

//get maintenance
router.get("/",GetMaintenance)

//update and get payment
router.put('/:maintenanceId/resident/payment', authenticate,updatePaymentMode);

//FindByIdUserAndMaintance
router.get("/getuserandMaintance",authenticate,fetchUserPendingMaintenance)

//get done maintannace
router.get("/donemaintannace", getResidentsWithCompletedPayments)

module.exports=router