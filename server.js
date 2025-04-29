require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Optional: Test route
app.get("/", (req, res) => {
  res.send("Hello from Railway!");
});

// Stream routes
app.use("/api/stream", require("./routes/streamRoutes"));
app.use("/api/status", require("./routes/statusRoutes"));

// Uncomment these when your other routes are ready
// app.use("/api/device", require("./routes/deviceRoutes"));
// app.use("/api/user", require("./routes/userRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
