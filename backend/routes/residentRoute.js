const router=require("express").Router();
const { addOwnerData, GetAllOwner, updateOwnerData, GetByIdResident, GetAllResidents, DeleteByIdResident, GetTotalResidentsCount } = require("../controller/ownerController");
const { GetAllTenant, updateTenantData, addTenant } = require("../controller/tenantController");
const upload=require("../utils/ownerImages")
//add owner
router.post("/addowner", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), addOwnerData);
//show owner 
router.get("/viewowner",GetAllOwner)


//update owner
router.put("/owner/:id", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), updateOwnerData);

//add tenant
router.post("/addTenant",upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), addTenant)


//show Tenant 
router.get("/viewTenant",GetAllTenant)

//update tenant
router.put("/Tenant/:id",upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), updateTenantData)


//======================
//get by id resident
router.get("/owner/:id",GetByIdResident)

// get all resident
router.get("/allresident",GetAllResidents)

//delete resident
router.delete("/:id",DeleteByIdResident)

// Route for fetching total residents count only
router.get('/unit/total-residents-count', GetTotalResidentsCount);

module.exports=router;