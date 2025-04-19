// controllers/streamController.js
const { exec } = require("child_process");

let streamProcess = null;

exports.startStream = (req, res) => {
  if (streamProcess) return res.status(400).json({ message: "Stream already running" });

  streamProcess = exec(
    "libcamera-vid -t 0 --inline --listen -o tcp://0.0.0.0:8888",
    (error, stdout, stderr) => {
      if (error) console.error("Stream error:", error.message);
      if (stderr) console.error("Stream stderr:", stderr);
    }
  );

  return res.json({ message: "Stream started" });
};

exports.stopStream = (req, res) => {
  if (!streamProcess) return res.status(400).json({ message: "Stream not running" });

  streamProcess.kill();
  streamProcess = null;

  return res.json({ message: "Stream stopped" });
};
