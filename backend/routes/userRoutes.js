const express = require("express");
const { Registration, login, logout, resetPassword } = require("../controller/userController");
const router = express.Router();

router.post("/Registration", Registration);
router.post("/login", login);
router.post("/logout", logout);

router.post("/reset-password/:userId", resetPassword);


module.exports = router;
