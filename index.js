require("dotenv").config();

// ==================== Web Server ====================
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive ✅");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

// ==================== Discord Bot ====================
const createClient = require("./core/client");
const loadCommands = require("./core/commandLoader");
const loadEvents = require("./core/eventLoader");
const db = require("./systems/databaseSystem");

async function start() {
  try {
    await db.connect();
    console.log("✅ Database connected");

    const client = createClient();

    await loadCommands(client);
    console.log("✅ Commands loaded");

    await loadEvents(client);
    console.log("✅ Events loaded");

    await client.login(process.env.DISCORD_TOKEN);
    console.log("🤖 Bot logged in");
  } catch (error) {
    console.error("❌ Error starting bot:", error);
  }
}

start();