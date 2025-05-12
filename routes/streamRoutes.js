const express = require("express");
const router = express.Router();
const { setStreamStatus, getStreamStatus , stopStream , getStreamUrl } = require("../controllers/streamController");

router.post("/set-stream", setStreamStatus);   
router.get("/get-stream", getStreamStatus);    
router.post("/stop-stream", stopStream); 
router.get("/url-stream", getStreamUrl);    

module.exports = router;
