const fs = require('fs');
const { exec } = require('child_process');
const privateKeyPath = '/tmp/id_rsa';

// Enhanced SSH configuration
const SSH_OPTIONS = [
  '-o StrictHostKeyChecking=no',
  '-o UserKnownHostsFile=/dev/null',
  '-o LogLevel=ERROR',
  '-o ConnectTimeout=10',
  '-o ServerAliveInterval=30'
].join(' ');

const writePrivateKey = () => {
  const privateKey = process.env.SSH_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!privateKey) {
    throw new Error('SSH_PRIVATE_KEY environment variable is missing');
  }

  try {
    fs.writeFileSync(privateKeyPath, privateKey, { mode: 0o600 });
    console.log(`Private key written to ${privateKeyPath}`);
    return privateKeyPath;
  } catch (err) {
    throw new Error(`Failed to write private key: ${err.message}`);
  }
};

const executeSSHCommand = async (command, res) => {
  const keyPath = writePrivateKey();
  const fullCommand = `ssh -i ${keyPath} ${SSH_OPTIONS} ${piUser}@${piIP} "${command}"`;
  
  console.log(`Executing: ${fullCommand.replace(new RegExp(process.env.SSH_PRIVATE_KEY, 'g'), '[REDACTED]')}`);
  
  return new Promise((resolve) => {
    exec(fullCommand, { timeout: 15000 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`SSH Error: ${error.message}`);
        if (res) res.status(500).json({ 
          error: 'SSH command failed',
          details: error.message,
          stderr: stderr.toString()
        });
        return resolve(false);
      }
      
      console.log(`SSH Output: ${stdout.toString()}`);
      if (stderr) console.error(`SSH Stderr: ${stderr.toString()}`);
      
      if (res) res.status(200).json({ 
        success: true,
        output: stdout.toString() 
      });
      resolve(true);
    });
  });
};

// Configuration (consider moving to environment variables)
const piIP = process.env.PI_IP || '192.168.1.12';
const piUser = process.env.PI_USER || 'adham';

exports.startStream = async (req, res) => {
  if (!piIP.startsWith('192.168.')) {
    return executeSSHCommand('bash /home/adham/stream.sh', res);
  }

  // Local network detection
  console.warn('Warning: Attempting to connect to local network IP from Railway');
  try {
    const success = await executeSSHCommand('bash /home/adham/stream.sh', res);
    if (!success && res.headersSent === false) {
      res.status(500).json({ 
        error: 'Cannot connect to local network from Railway',
        solution: 'Use a public IP or tunneling service'
      });
    }
  } catch (err) {
    console.error('Stream start failed:', err);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: err.message,
        solution: 'Check Railway logs and network configuration'
      });
    }
  }
};

exports.stopStream = async (req, res) => {
  try {
    await executeSSHCommand('sudo pkill -9 libcamera-vid && sudo pkill -9 ffmpeg', res);
  } catch (err) {
    console.error('Stream stop failed:', err);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: err.message,
        details: 'Failed to stop streaming processes'
      });
    }
  }
};

// Helper for debugging
exports.testConnection = async (req, res) => {
  try {
    const success = await executeSSHCommand('hostname', res);
    if (!success && !res.headersSent) {
      res.status(500).json({ error: 'SSH connection test failed' });
    }
  } catch (err) {
    console.error('Connection test failed:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
};