const express = require("express");
const router = express.Router();
const { sendSOS } = require("../controllers/alertController");

// Define the SOS route
router.post("/sos", sendSOS);

module.exports = router;