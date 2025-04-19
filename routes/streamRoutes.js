const express = require("express");
const router = express.Router();
const { setStreamStatus, getStreamStatus } = require("../controllers/streamController");

router.post("/set-stream", setStreamStatus);
router.get("/get-stream", getStreamStatus);

module.exports = router;
