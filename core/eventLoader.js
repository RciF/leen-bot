const fs = require("fs")
const path = require("path")

module.exports = async (client) => {
  const files = fs.readdirSync(path.join(__dirname, "../events"))

  for (const file of files) {
    const event = require(`../events/${file}`)

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client))
    } else {
      client.on(event.name, (...args) => event.execute(...args, client))
    }
  }
}