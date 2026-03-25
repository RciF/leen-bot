const { Client, GatewayIntentBits, Collection } = require("discord.js")

module.exports = () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  })

  client.commands = new Collection()

  return client
}