require("dotenv").config()

const { REST, Routes } = require("discord.js")
const fs = require("fs")
const path = require("path")

const commands = []

const base = path.join(__dirname, "commands")
const folders = fs.readdirSync(base)

for (const folder of folders) {
  const files = fs.readdirSync(path.join(base, folder))

  for (const file of files) {
    const command = require(`./commands/${folder}/${file}`)
    commands.push(command.data.toJSON())
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN)

;(async () => {
  try {
    console.log("🚀 Deploying commands...")

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    )

    console.log("✅ Commands deployed")
  } catch (error) {
    console.error(error)
  }
})()