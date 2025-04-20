// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json()); // Parse JSON body
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//     console.log("Server running on port 5000");
//   });
  
// // app.use("/api/device", require("./routes/deviceRoutes"));
// // app.use("/api/user", require("./routes/userRoutes"));
// // app.use('/api/sos', require("./routes/sosRoutes"));
// app.use("/api/stream", require("./routes/streamRoutes"));
// server.js - No authentication version
// server.js
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: process.env.RTMP_PORT || 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: process.env.PORT || 3000,
    allow_origin: '*'
  }
};

const nms = new NodeMediaServer(config);
nms.run();