let streamActive = false;
const crypto = require('crypto');

// exports.setStreamStatus = (req, res) => {
//   // Default to true if no body or no active field
//   const active = typeof req.body.active === 'boolean' ? req.body.active : true;

//   streamActive = active;
//   res.status(200).json({ message: `Stream ${active ? 'started' : 'stopped'}` });
// };

exports.getStreamStatus = (req, res) => {
  res.status(200).json({ active: streamActive });
};

exports.stopStream = (req, res) => {
  streamActive = false;
  res.status(200).json({ message: "Stream stopped via stop-stream endpoint" });
};

exports.setStreamStatus = (req, res) => {
  const deviceId = req.body.deviceId;
  const active = typeof req.body.active === 'boolean' ? req.body.active : true;

  if (!deviceId) return res.status(400).json({ message: "Missing deviceId" });

  if (active) {
    // Generate unique stream key
    const streamKey = crypto.randomBytes(8).toString('hex');
    // Save this to a map or in-memory store
    global.currentStreams = global.currentStreams || {};
    global.currentStreams[deviceId] = {
      streamKey,
      expiresAt: Date.now() + 10 * 60 * 1000 // valid for 10 minutes
    };
    console.log("🔐 Generated stream key:", streamKey);
    return res.json({ streamKey });
  }

  // Clear stream key
  if (global.currentStreams) delete global.currentStreams[deviceId];
  return res.json({ message: "Stream stopped" });
};

exports.getStreamUrl = (req, res) => {
  const { deviceId } = req.query;
  const baseUrl = "rtmp://trolley.proxy.rlwy.net:24127/stream"; // your base RTMP

  const streamData = global.currentStreams?.[deviceId];

  if (!streamData || Date.now() > streamData.expiresAt) {
    return res.status(404).json({ message: "No active stream or expired" });
  }

  const fullUrl = `${baseUrl}/${streamData.streamKey}`;
  return res.json({ streamUrl: fullUrl });
};