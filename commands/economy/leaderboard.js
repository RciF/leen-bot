const { SlashCommandBuilder } = require("discord.js")
const db = require("../../systems/databaseSystem")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("أغنى اللاعبين"),

  async execute(interaction) {
    const res = await db.query(
      "SELECT id, coins FROM users ORDER BY coins DESC LIMIT 10"
    )

    if (!res.rows.length) {
      return interaction.reply("لا يوجد بيانات")
    }

    let text = "🏆 Leaderboard:\n\n"

    let i = 1

    for (const u of res.rows) {
      let name = "Unknown"

      try {
        const user = await interaction.client.users.fetch(u.id)
        name = user.username
      } catch {}

      text += `${i}. ${name} — ${u.coins}\n`
      i++
    }

    await interaction.reply(text)
  },
}