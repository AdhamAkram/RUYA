// routes/streamRoutes.js
const express = require("express");
const router = express.Router();
const { startStream, stopStream } = require("../controllers/streamController");

router.post("/start", startStream);
router.post("/stop", stopStream);

module.exports = router;
