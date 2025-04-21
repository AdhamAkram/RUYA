// server.js
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: process.env.RTMP_PORT || 1935,
    chunk_size: 4096,
    publish_validator: (sessionId, streamPath, streamKey) => {
      return streamKey === "stream"; // Only check stream key
    }
  },
  http: {
    port: process.env.PORT || 3000,
    allow_origin: '*'
  }
};

const nms = new NodeMediaServer(config);
nms.run();

// Simple status endpoint
require('express')()
  .get('/', (req, res) => res.send('RTMP Server Running'))
  .listen(config.http.port);