const { CreateAlert, GetAlert } = require("../controller/securityAlertController");
const { authenticate, IsSecurity } = require("../middleware/authenticate ");
const router= require("express").Router()

// add alert
router.post("/addalert",authenticate,IsSecurity,CreateAlert)

// get alert
router.get("/",GetAlert)


module.exports=router;