const { SlashCommandBuilder } = require("discord.js")
const db = require("../../systems/databaseSystem")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("balance"),

  async execute(interaction) {
    const id = interaction.user.id

    const res = await db.query(
      "INSERT INTO users(id, coins) VALUES($1,0) ON CONFLICT (id) DO NOTHING",
      [id]
    )

    const data = await db.query("SELECT coins FROM users WHERE id=$1", [id])

    await interaction.reply(`💰 ${data.rows[0].coins}`)
  },
}