require("dotenv").config()

const createClient = require("./core/client")
const loadCommands = require("./core/commandLoader")
const loadEvents = require("./core/eventLoader")
const db = require("./systems/databaseSystem")

async function start() {
  await db.connect()

  const client = createClient()

  await loadCommands(client)
  await loadEvents(client)

  await client.login(process.env.TOKEN)
}

start()