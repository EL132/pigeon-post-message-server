const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let latestMessage = "no message yet";

// health check
app.get("/", (req, res) => {
  res.json({ status: "server running" });
});

// send message
app.post("/message", (req, res) => {
  latestMessage = req.body.message;
  console.log("Received:", latestMessage);

  res.json({
    success: true,
    stored: latestMessage
  });
});

// receive latest message
app.get("/message", (req, res) => {
  res.json({
    message: latestMessage
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});