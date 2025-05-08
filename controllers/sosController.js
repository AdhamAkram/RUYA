let sosActive = {};

exports.triggerSOS = (req, res) => {
  const { deviceId } = req.body;
  if (!deviceId) return res.status(400).json({ message: "Missing deviceId" });

  sosActive[deviceId] = true;
  console.log(`🚨 SOS triggered for ${deviceId}`);
  res.json({ message: "SOS triggered" });
};

exports.getSOSStatus = (req, res) => {
  const { deviceId } = req.query;
  if (!deviceId) return res.status(400).json({ message: "Missing deviceId" });

  const active = sosActive[deviceId] || false;
  res.json({ sos: active });
};

exports.clearSOS = (req, res) => {
  const { deviceId } = req.body;
  sosActive[deviceId] = false;
  res.json({ message: "SOS cleared" });
};
