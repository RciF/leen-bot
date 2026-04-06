require("dotenv").config()

const express = require('express')
const app = express()

const createClient = require("./core/client")
const loadCommands = require("./core/commandLoader")
const loadEvents = require("./core/eventLoader")
const db = require("./systems/databaseSystem")

// ==================== Web Server ====================
app.get('/', (req, res) => {
  res.send('Bot is alive ✅')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`)
})

// ==================== تشغيل البوت ====================
async function start() {
  await db.connect()

  const client = createClient()

  await loadCommands(client)
  await loadEvents(client)

  await client.login(process.env.TOKEN)
}

start()