const express = require('express');
const router = express.Router();
const sosController = require('../controllers/sosController');

// Route to trigger an SOS emergency
router.post('/trigger', sosController.triggerSOS);

module.exports = router;
