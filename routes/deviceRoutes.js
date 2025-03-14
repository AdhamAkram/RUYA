const express = require("express");
const router = express.Router();
const { validateDevice, pairDevice, getDevice, listDevices, unpairDevice } = require("../controllers/deviceController");

// Define the /validate route
router.get("/validate/:deviceId", validateDevice);

// Other routes

router.post("/pair", pairDevice);
router.get("/:deviceId", getDevice);
router.get("/list", listDevices);
router.post("/unpair", unpairDevice);

module.exports = router;