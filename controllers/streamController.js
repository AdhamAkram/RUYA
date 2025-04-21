const fs = require('fs');
const { Client } = require('ssh2');

// Raspberry Pi details
const piIP = '192.168.1.12';
const piUser = 'adham';

// Write private key to a temporary file
const writePrivateKey = () => {
  const privateKey = process.env.SSH_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!privateKey) {
    throw new Error('SSH private key is missing.');
  }

  const privateKeyPath = '/tmp/id_rsa';
  fs.writeFileSync(privateKeyPath, privateKey, { mode: 0o600 });
  return privateKey;
};

exports.startStream = (req, res) => {
  const conn = new Client();

  try {
    const privateKey = writePrivateKey();

    conn
      .on('ready', () => {
        console.log('SSH Connection ready for start stream');

        conn.exec('bash /home/adham/stream.sh', (err, stream) => {
          if (err) {
            console.error('Exec error:', err);
            res.status(500).json({ message: 'Stream start command failed' });
            conn.end();
            return;
          }

          stream
            .on('close', (code, signal) => {
              console.log('Stream closed with code:', code);
              conn.end();
              res.status(200).json({ message: 'Streaming started successfully!' });
            })
            .on('data', (data) => {
              console.log('STDOUT:', data.toString());
            })
            .stderr.on('data', (data) => {
              console.error('STDERR:', data.toString());
            });
        });
      })
      .on('error', (err) => {
        console.error('SSH Connection Error:', err);
        res.status(500).json({ message: 'SSH connection failed' });
      })
      .connect({
        host: piIP,
        port: 22,
        username: piUser,
        privateKey: privateKey,
      });

  } catch (err) {
    console.error('Key error:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.stopStream = (req, res) => {
  const conn = new Client();

  try {
    const privateKey = writePrivateKey();

    conn
      .on('ready', () => {
        console.log('SSH Connection ready for stop stream');

        const stopCmd = 'sudo pkill -9 libcamera-vid && sudo pkill -9 ffmpeg';

        conn.exec(stopCmd, (err, stream) => {
          if (err) {
            console.error('Exec error:', err);
            res.status(500).json({ message: 'Stop command failed' });
            conn.end();
            return;
          }

          stream
            .on('close', (code, signal) => {
              console.log('Stream closed with code:', code);
              conn.end();
              res.status(200).json({ message: 'Streaming stopped successfully!' });
            })
            .on('data', (data) => {
              console.log('STDOUT:', data.toString());
            })
            .stderr.on('data', (data) => {
              console.error('STDERR:', data.toString());
            });
        });
      })
      .on('error', (err) => {
        console.error('SSH Connection Error:', err);
        res.status(500).json({ message: 'SSH connection failed' });
      })
      .connect({
        host: piIP,
        port: 22,
        username: piUser,
        privateKey: privateKey,
      });

  } catch (err) {
    console.error('Key error:', err);
    res.status(500).json({ message: err.message });
  }
};
