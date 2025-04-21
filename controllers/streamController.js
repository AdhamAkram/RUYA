const fs = require('fs');
const { exec } = require('child_process');

exports.startStream = (req, res) => {
  console.log("Private key length:", process.env.SSH_PRIVATE_KEY?.length);

  const privateKey = process.env.SSH_PRIVATE_KEY;
  const privateKeyPath = '/tmp/id_rsa';

  if (!privateKey) {
    return res.status(500).json({ message: 'SSH private key is missing.' });
  }

  // Write the private key to a file in the container
  fs.writeFileSync(privateKeyPath, privateKey, { mode: 0o600 });

  const staticPiIP = '192.168.1.12'; // Raspberry Pi IP
  const password = 'admin';  // Set the password to 'admin'

  const command = `sshpass -p '${password}' ssh -i ${privateKeyPath} adham@${staticPiIP} "bash /home/pi/stream.sh"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ message: `Command failed: ${error.message}` });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ message: `Command failed: ${stderr}` });
    }
    console.log(`stdout: ${stdout}`);
    return res.status(200).json({ message: "Streaming started successfully!" });
  });
};

exports.stopStream = (req, res) => {
  console.log("Private key length:", process.env.SSH_PRIVATE_KEY?.length);

  const privateKey = process.env.SSH_PRIVATE_KEY;
  const privateKeyPath = '/tmp/id_rsa';

  if (!privateKey) {
    return res.status(500).json({ message: 'SSH private key is missing.' });
  }

  // Write the private key to a file in the container
  fs.writeFileSync(privateKeyPath, privateKey, { mode: 0o600 });

  const staticPiIP = '192.168.1.12'; // Raspberry Pi IP
  const password = 'admin';  // Set the password to 'admin'

  const command = `sshpass -p '${password}' ssh -i ${privateKeyPath} adham@${staticPiIP} "sudo pkill -9 libcamera-vid && sudo pkill -9 ffmpeg"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ message: `Command failed: ${error.message}` });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ message: `Command failed: ${stderr}` });
    }
    console.log(`stdout: ${stdout}`);
    return res.status(200).json({ message: "Streaming stopped successfully!" });
  });
};
