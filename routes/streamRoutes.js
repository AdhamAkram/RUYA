const express = require("express");
const router = express.Router();
const { setStreamStatus, getStreamStatus , stopStream } = require("../controllers/streamController");

router.post("/set-stream", setStreamStatus);   
router.get("/get-stream", getStreamStatus);    
router.post("/stop-stream", stopStream); 

module.exports = router;
