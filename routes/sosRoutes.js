const express = require('express');
const router = express.Router();
const sosController = require('../controllers/sosController');

router.post('/trigger-sos', sosController.triggerSOS);
router.get('/sos-status', sosController.getSOSStatus);
router.post('/clear-sos', sosController.clearSOS);

module.exports = router;
