// Requirements
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/ctrlUsers");

// Controllers settings
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Exporting Router
module.exports = router;
