const axios = require("axios");

exports.getRemotePiStatus = async (req, res) => {
  try {
    const response = await axios.get("http://<PI_LOCAL_IP>:5050/status");
    res.json(response.data);
  } catch (err) {
    console.error("❌ Failed to get Pi status:", err.message);
    res.status(500).json({ error: "Pi not reachable" });
  }
};
