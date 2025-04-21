// controllers/streamController.js
const { exec } = require("child_process");

// Function to start the stream
exports.startStream = (req, res) => {
  const inputFilePath = 'test_inline.h264'; // Path to your video file
  const rtmpUrl = 'rtmp://trolley.proxy.rlwy.net:24127/stream/teststream1'; // RTMP server URL

  // FFmpeg command to start streaming
  const command = `ffmpeg -re -f h264 -i ${inputFilePath} -c:v copy -vsync 2 -f flv ${rtmpUrl}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res.status(500).send('Error starting stream');
    }
    if (stderr) {
      console.error(`FFmpeg stderr: ${stderr}`);
    }
    console.log(`FFmpeg stdout: ${stdout}`);
    res.send('Stream started successfully');
  });
};
