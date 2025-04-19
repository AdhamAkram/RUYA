// Example: streamController.js

let streamActive = false;

exports.setStreamStatus = (req, res) => {
  const { active } = req.body;
  streamActive = active;
  res.json({ message: `Stream status set to ${active}` });
};

exports.getStreamStatus = (req, res) => {
  res.json({ active: streamActive });
};
