const { SlashCommandBuilder } = require("discord.js")
const db = require("../../systems/databaseSystem")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("work"),

  async execute(interaction) {
    const id = interaction.user.id
    const reward = Math.floor(Math.random() * 50)

    await db.query(
      "UPDATE users SET coins = coins + $1 WHERE id=$2",
      [reward, id]
    )

    await interaction.reply(`💼 +${reward}`)
  },
}