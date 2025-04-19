// controllers/streamController.js
const { exec } = require("child_process");
const os = require("os");

let streamProcess = null;

function getPiIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const details of interfaces[iface]) {
      if (details.family === "IPv4" && !details.internal) {
        return details.address;
      }
    }
  }
  return null;
}

exports.startStream = (req, res) => {
  if (streamProcess) return res.status(400).json({ message: "Stream already running" });

  const { resolution = "640x480", framerate = 25 } = req.query;
  const piIpAddress = getPiIpAddress();
  if (!piIpAddress) return res.status(500).json({ message: "Unable to determine Raspberry Pi IP address" });

  const streamCommand = `libcamera-vid -t 0 --width ${resolution.split('x')[0]} --height ${resolution.split('x')[1]} --framerate ${framerate} --listen -o tcp://${piIpAddress}:8888`;

  streamProcess = exec(streamCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("Stream error:", error.message);
      return res.status(500).json({ message: "Stream error", error: error.message });
    }
    if (stderr) {
      console.error("Stream stderr:", stderr);
    }
    console.log("Stream stdout:", stdout);
  });

  return res.json({ message: "Stream started", ip: piIpAddress, port: 8888 });
};

exports.stopStream = (req, res) => {
  if (!streamProcess) return res.status(400).json({ message: "Stream not running" });

  streamProcess.kill();
  streamProcess = null;

  return res.json({ message: "Stream stopped" });
};
