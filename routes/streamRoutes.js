// routes/streamRoutes.js
const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

// Route to start the stream
router.post('/start', streamController.startStream);
// router.post('/stop', streamController.stopStream);
module.exports = router;
