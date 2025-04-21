require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON body

const PORT = process.env.PORT || 8080;

// Use the stream routes
app.use("/api/stream", require("./routes/streamRoutes"));  // Add this line

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use("/api/device", require("./routes/deviceRoutes"));
// app.use("/api/user", require("./routes/userRoutes"));
