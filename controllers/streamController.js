let streamActive = false;

exports.setStreamStatus = (req, res) => {
  // Default to true if no body or no active field
  const active = typeof req.body.active === 'boolean' ? req.body.active : true;

  streamActive = active;
  res.status(200).json({ message: `Stream ${active ? 'started' : 'stopped'}` });
};

exports.getStreamStatus = (req, res) => {
  res.status(200).json({ active: streamActive });
};

exports.stopStream = (req, res) => {
  streamActive = false;
  res.status(200).json({ message: "Stream stopped via stop-stream endpoint" });
};
