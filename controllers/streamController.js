const fs = require('fs');
const { exec } = require('child_process');
const privateKeyPath = '/tmp/id_rsa';
const writePrivateKey = () => {
  const privateKey = process.env.SSH_PRIVATE_KEY?.replace(/\\n/g, '\n');

  console.log('Private Key:', privateKey);

  if (!privateKey) {
    throw new Error('SSH private key is missing.');
  }

  fs.writeFileSync(privateKeyPath, privateKey, { mode: 0o600 });
  console.log(`Written Private Key to ${privateKeyPath}`);

  return privateKeyPath;
};


const piIP = '192.168.1.12';
const piUser = 'adham';

exports.startStream = (req, res) => {
  try {
    const keyPath = writePrivateKey();
    const command = `ssh -i ${keyPath} ${piUser}@${piIP} "bash /home/adham/stream.sh"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ message: `Command failed: ${error.message}` });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ message: `Error: ${stderr}` });
      }

      console.log(`stdout: ${stdout}`);
      return res.status(200).json({ message: "Streaming started successfully!" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.stopStream = (req, res) => {
  try {
    const keyPath = writePrivateKey();
    const command = `ssh -i ${keyPath} ${piUser}@${piIP} "sudo pkill -9 libcamera-vid && sudo pkill -9 ffmpeg"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ message: `Command failed: ${error.message}` });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ message: `Error: ${stderr}` });
      }

      console.log(`stdout: ${stdout}`);
      return res.status(200).json({ message: "Streaming stopped successfully!" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
