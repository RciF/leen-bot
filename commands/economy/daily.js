const { SlashCommandBuilder } = require("discord.js")
const db = require("../../systems/databaseSystem")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("daily"),

  async execute(interaction) {
    const id = interaction.user.id

    await db.query(
      "UPDATE users SET coins = coins + 100 WHERE id=$1",
      [id]
    )

    await interaction.reply("🎁 +100")
  },
}