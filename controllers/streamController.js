const { exec } = require("child_process");

const password = "admin";  // Replace with the password for the Raspberry Pi

exports.startStream = (req, res) => {
  // Use the static IP of your Raspberry Pi for the streaming script execution
  const staticPiIP = '192.168.1.12';  // Replace with your Pi's static IP
  const scriptPath = `/home/adham/stream.sh`;  // Path to the stream.sh file on the Pi

  // Execute the stream.sh script using SSH and password with sshpass
  const command = `sshpass -p ${password} ssh pi@${staticPiIP} "bash ${scriptPath}"`;  // SSH into the Pi and execute the script

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ message: `Stream start failed: ${error.message}` });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ message: `Stream start failed: ${stderr}` });
    }

    console.log(`stdout: ${stdout}`);
    return res.status(200).json({ message: "Streaming started successfully!" });
  });
};

exports.stopStream = (req, res) => {
  // Use SSH to stop the stream on the Raspberry Pi
  const staticPiIP = '192.168.1.12';  // Replace with your Pi's static IP
  const stopCommand = `sshpass -p ${password} ssh pi@${staticPiIP} "sudo pkill -9 libcamera-vid && sudo pkill -9 ffmpeg && sleep 2"`;  // SSH command to stop the streaming

  exec(stopCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ message: `Stream stop failed: ${error.message}` });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ message: `Stream stop failed: ${stderr}` });
    }

    console.log(`stdout: ${stdout}`);
    return res.status(200).json({ message: "Streaming stopped successfully!" });
  });
};
