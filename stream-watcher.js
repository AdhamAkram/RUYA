const axios = require("axios");
const { exec } = require("child_process");

let streamProcess = null;
const checkInterval = 5000; // check every 5 seconds

async function checkStreamStatus() {
  try {
    const response = await axios.get("https://ruya-production.up.railway.app/api/stream/get-stream");
    const shouldStream = response.data.active;

    if (shouldStream && !streamProcess) {
      console.log("🟢 Starting stream...");
      streamProcess = exec("libcamera-vid -t 0 --inline -o - | ffmpeg -f rawvideo -pix_fmt yuv420p -s 640x480 -i - -f flv rtmp://<your-rtmp-server>/live/stream");
    }

    if (!shouldStream && streamProcess) {
      console.log("🔴 Stopping stream...");
      streamProcess.kill();
      streamProcess = null;
    }
  } catch (err) {
    console.error("❌ Error checking stream status:", err.message);
  }
}

setInterval(checkStreamStatus, checkInterval);
