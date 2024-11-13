const router = require("express").Router();
const { updateSecurity, deleteSecurity, createSecurity, GetAllSecurity, GetSecurityById } = require("../controller/securityGuardController");
const upload = require("../utils/securityImage"); // Assuming this handles Security image uploads

// Routes for Security
router.post("/addsecurity", upload.fields([ { name: 'Security_Photo', maxCount: 1 }, { name: 'Aadhar_Card', maxCount: 1 }]), createSecurity);
router.get("/", GetAllSecurity);
router.get('/:id', GetSecurityById);
router.put('/updatesecurity/:id', upload.fields([{ name: 'Security_Photo', maxCount: 1 }, { name: 'Aadhar_Card', maxCount: 1 } ]), updateSecurity);
router.delete('/deletesecurity/:id', deleteSecurity);

module.exports = router;
