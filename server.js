const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let latestMessage = "no message yet";
let lastUpdateTimestamp = 0; // Stores time in milliseconds

// health check
app.get("/", (req, res) => {
  res.json({ status: "server running" });
});

// send message
app.post("/message", (req, res) => {
  latestMessage = req.body.message;
  lastUpdateTimestamp = Date.now(); // Record the exact moment the message arrived
  
  console.log("Received:", latestMessage, "at", new Date(lastUpdateTimestamp).toLocaleTimeString());

  res.json({
    success: true,
    stored: latestMessage,
    timestamp: lastUpdateTimestamp
  });
});

// receive latest message
app.get("/message", (req, res) => {
  // Calculate how many seconds have passed since the last update
  const now = Date.now();
  const secondsAgo = lastUpdateTimestamp === 0 ? 999 : Math.floor((now - lastUpdateTimestamp) / 1000);

  res.json({
    message: latestMessage,
    seconds_ago: secondsAgo // This is what your ESP32 code uses to trigger "INCOMING"
  });
});

const PORT = process.env.PORT || 3000; // Use process.env.PORT for Render compatibility
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});