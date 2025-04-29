const express = require("express");
const router = express.Router();
const controller = require("../controllers/statusController");

router.post("/update", controller.updateStatusFromPi);
router.get("/", controller.getPiStatus);

module.exports = router;
