// Requirements
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/ctrlUsers");
const checkEmail = require("../middleware/validator");

// Controllers settings
router.post("/signup", checkEmail, userCtrl.signup);
router.post("/login", checkEmail, userCtrl.login);

// Exporting Router
module.exports = router;
