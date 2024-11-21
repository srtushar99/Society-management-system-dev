const { CreateAlert, GetAlert } = require("../controller/securityAlertController");
const { authenticate, IsSecurity } = require("../middleware/authenticate ");

const router= require("express").Router()

router.post("/addalert",authenticate,IsSecurity,CreateAlert)
router.get("/",GetAlert)


module.exports=router;