const express = require("express");
const router = express.Router();
const { setStreamStatus, getStreamStatus } = require("../controllers/streamController");

router.post("/set-stream", setStreamStatus);   // To start/stop stream
router.get("/get-stream", getStreamStatus);    // Pi will poll this

module.exports = router;
