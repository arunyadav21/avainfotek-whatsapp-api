const express = require("express");
const app = express();

app.use(express.json());

// Webhook verification (Meta ke liye)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "avainfotek_verify";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

// Incoming messages
app.post("/webhook", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Avainfotek WhatsApp API is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
