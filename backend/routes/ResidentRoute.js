const router=require("express").Router();
const { addOwnerData, GetAllOwner } = require("../controller/ownerController");
const upload=require("../utils/ownerImages")


router.post("/addowner", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'Owner_image', maxCount: 1 }
]),addOwnerData);


router.get("/viewowner",GetAllOwner)
module.exports=router;