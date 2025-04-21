const { exec } = require("child_process");

exports.startStream = (req, res) => {
  // Path to your stream.sh file
  const scriptPath = "./home/adham/stream.sh";  // Adjust the path as necessary

  exec(scriptPath, (error, stdout, stderr) => {
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