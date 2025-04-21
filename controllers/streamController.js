const fs = require('fs');
const { exec } = require('child_process');

const privateKey = process.env.SSH_PRIVATE_KEY;
const privateKeyPath = '/tmp/id_rsa';

// Write the private key to a file in the container
fs.writeFileSync(privateKeyPath, privateKey, { mode: 0o600 });

const staticPiIP = '192.168.1.12'; // Raspberry Pi IP

const command = `ssh -i ${privateKeyPath} adham@${staticPiIP} "bash /home/pi/stream.sh"`;

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
