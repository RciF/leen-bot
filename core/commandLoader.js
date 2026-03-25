const fs = require("fs")
const path = require("path")

module.exports = async (client) => {
  const base = path.join(__dirname, "../commands")

  const folders = fs.readdirSync(base)

  for (const folder of folders) {
    const files = fs.readdirSync(path.join(base, folder))

    for (const file of files) {
      const command = require(`../commands/${folder}/${file}`)

      client.commands.set(command.data.name, command)
    }
  }
}