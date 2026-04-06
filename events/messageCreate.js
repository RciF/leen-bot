const { addXP } = require("../systems/levelSystem")
const { handleAI } = require("../systems/aiAutoReply")

module.exports = {
  name: "messageCreate",

  async execute(message) {
    if (message.author.bot) return

    await handleAI(message)

    const leveledUp = await addXP(message.author.id)

    if (leveledUp) {
      message.channel.send(`🎉 ${message.author} Level Up!`)
    }
  },
}