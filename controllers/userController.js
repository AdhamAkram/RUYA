const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, role } = req.body;
    const newUser = await User.create({ name, role });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.listUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json({ users });
    } catch (error) {
      console.error("Error listing users:", error);
      res.status(500).json({ error: "Server error" });
    }
  };