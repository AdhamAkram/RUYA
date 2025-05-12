let streamActive = false;
const crypto = require('crypto');

// Unified stream status tracking
global.currentStreams = global.currentStreams || {};

exports.getStreamStatus = (req, res) => {
  // Check both the global flag and specific device streams
  const active = streamActive || Object.keys(global.currentStreams).length > 0;
  res.status(200).json({ active });
};

exports.stopStream = (req, res) => {
  const deviceId = req.body.deviceId;
  
  if (deviceId) {
    // Stop specific device stream
    if (global.currentStreams[deviceId]) {
      delete global.currentStreams[deviceId];
      return res.status(200).json({ message: `Stream stopped for device ${deviceId}` });
    }
    return res.status(404).json({ message: "No active stream for this device" });
  }
  
  // Stop all streams if no device specified
  streamActive = false;
  global.currentStreams = {};
  res.status(200).json({ message: "All streams stopped" });
};

exports.setStreamStatus = (req, res) => {
  const deviceId = req.body.deviceId;
  const active = typeof req.body.active === 'boolean' ? req.body.active : true;

  if (!deviceId) return res.status(400).json({ message: "Missing deviceId" });

  if (active) {
    const streamKey = crypto.randomBytes(8).toString('hex');
    global.currentStreams[deviceId] = {
      streamKey,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    };
    streamActive = true;
    return res.json({ streamKey });
  }

  // Stopping specific stream
  if (global.currentStreams[deviceId]) {
    delete global.currentStreams[deviceId];
    // Update global status if no streams left
    if (Object.keys(global.currentStreams).length === 0) {
      streamActive = false;
    }
    return res.json({ message: "Stream stopped" });
  }
  
  return res.status(404).json({ message: "No active stream for this device" });
};

exports.getStreamUrl = (req, res) => {
  const { deviceId } = req.query;
  const baseUrl = "rtmp://trolley.proxy.rlwy.net:24127/stream";

  const streamData = global.currentStreams?.[deviceId];

  if (!streamData || Date.now() > streamData.expiresAt) {
    // Auto-clean expired streams
    if (streamData) delete global.currentStreams[deviceId];
    return res.status(404).json({ message: "No active stream or expired" });
  }

  const fullUrl = `${baseUrl}/${streamData.streamKey}`;
  return res.json({ streamUrl: fullUrl });
};