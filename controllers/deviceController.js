const Device = require("../models/Device");

// Test database connection
exports.testDbConnection = async (req, res) => {
  try {
    // Fetch all users to test the database connection
    const users = await User.findAll();
    res.json({ message: "Database connection successful", users });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
};

exports.validateDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.deviceId);
    if (!device) return res.status(404).json({ error: "Device not found" });
    res.json({ deviceId: device.deviceId, paired: !!device.pairedWith });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.pairDevice = async (req, res) => {
  try {
    const { deviceId, userId } = req.body;
    const device = await Device.findByPk(deviceId);
    if (!device) return res.status(404).json({ error: "Device not found" });

    device.pairedWith = userId;
    await device.save();
    res.json({ message: "Device paired successfully", pairedWith: userId });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getDevice = async (req, res) => {
    try {
      const deviceId = req.params.deviceId;
      const device = await Device.findByPk(deviceId);
  
      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }
  
      res.json({ device });
    } catch (error) {
      console.error("Error fetching device details:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  exports.listDevices = async (req, res) => {
    try {
      const devices = await Device.findAll();
      res.json({ devices });
    } catch (error) {
      console.error("Error listing devices:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  exports.unpairDevice = async (req, res) => {
    try {
      const { deviceId } = req.body;
      const device = await Device.findByPk(deviceId);
  
      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }
  
      device.pairedWith = null; // Unpair the device
      await device.save();
  
      res.json({ message: "Device unpaired successfully", deviceId });
    } catch (error) {
      console.error("Error unpairing device:", error);
      res.status(500).json({ error: "Server error" });
    }
  };