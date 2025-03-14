const express = require("express");
const router = express.Router();
const { createUser, getUser , listUsers } = require("../controllers/userController");

router.post("/create", createUser);
router.get("/:userId", getUser);
router.get("/list", listUsers);

module.exports = router;
