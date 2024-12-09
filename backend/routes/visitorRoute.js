// const { CreateVisitor, GetAllVisitor, FilterVisitor } = require("../controller/SecurityvisitorController");
const { CreateVisitor, GetAllVisitor, FilterVisitor } = require("../controller/securityVisitorController");
const { authenticate, IsSecurity } = require("../middleware/authenticate ");
const router=require("express").Router();

router.post("/addvisitor",authenticate,IsSecurity,CreateVisitor)
router.get("/",authenticate,GetAllVisitor)
router.get("/filter",authenticate,IsSecurity,FilterVisitor)


module.exports=router;