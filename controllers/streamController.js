const { spawn } = require("child_process");

const password = "admin";  // Replace with the password for the Raspberry Pi

exports.startStream = (req, res) => {
  const staticPiIP = '192.168.1.12';  // Replace with your Pi's static IP
  const scriptPath = `/home/adham/stream.sh`;  // Path to the stream.sh file on the Pi

  // Execute the stream.sh script using SSH and password with sshpass
  const command = spawn("sshpass", ["-p", password, "ssh", `pi@${staticPiIP}`, `bash ${scriptPath}`]);

  command.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  command.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  command.on("close", (code) => {
    if (code === 0) {
      return res.status(200).json({ message: "Streaming started successfully!" });
    } else {
      return res.status(500).json({ message: `Stream start failed with exit code ${code}` });
    }
  });
};

exports.stopStream = (req, res) => {
  const staticPiIP = '192.168.1.12';  // Replace with your Pi's static IP
  const stopCommand = spawn("sshpass", ["-p", password, "ssh", `pi@${staticPiIP}`, "sudo pkill -9 libcamera-vid && sudo pkill -9 ffmpeg && sleep 2"]);

  stopCommand.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  stopCommand.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  stopCommand.on("close", (code) => {
    if (code === 0) {
      return res.status(200).json({ message: "Streaming stopped successfully!" });
    } else {
      return res.status(500).json({ message: `Stream stop failed with exit code ${code}` });
    }
  });
};
