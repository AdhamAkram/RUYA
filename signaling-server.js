// signaling-server.js
const express = require('express');
const { Server } = require('ws');
const SimplePeer = require('simple-peer');
const wrtc = require('wrtc');

const app = express();
const server = app.listen(3000, () => console.log('Server is running on port 3000'));
const wss = new Server({ server });

// Handle WebSocket connections
wss.on('connection', (socket) => {
  let peer;

  socket.on('offer', (offer) => {
    // When we receive an offer, we create a peer connection
    peer = new SimplePeer({ initiator: true, wrtc });

    peer.on('signal', (data) => {
      // Send back the answer after signaling
      socket.emit('answer', data);
    });

    peer.on('connect', () => {
      console.log('Peer connected');
      // Send a dummy video stream when connected (or a message)
      peer.send('Hello, Peer!');
    });

    peer.signal(offer);  // Signal the peer with the offer
  });

  socket.on('answer', (answer) => {
    if (peer) {
      peer.signal(answer);  // Signal the answer to the peer
    }
  });

  socket.on('candidate', (candidate) => {
    if (peer) {
      peer.signal(candidate);  // Signal ICE candidates
    }
  });

  socket.on('close', () => {
    if (peer) peer.destroy();  // Cleanup peer connection
  });
});

// Serve a simple message to verify the server is running
app.get('/', (req, res) => {
  res.send('WebRTC signaling server is running');
});
