const { SlashCommandBuilder } = require("discord.js")
const db = require("../../systems/databaseSystem")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("تحذير عضو")
    .addUserOption(o =>
      o.setName("user").setDescription("العضو").setRequired(true)
    )
    .addStringOption(o =>
      o.setName("reason").setDescription("السبب")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user")
    const reason = interaction.options.getString("reason") || "بدون سبب"

    await db.query(`
      CREATE TABLE IF NOT EXISTS warns (
        user_id TEXT,
        reason TEXT
      )
    `)

    await db.query(
      "INSERT INTO warns(user_id, reason) VALUES($1,$2)",
      [user.id, reason]
    )

    await interaction.reply(`⚠️ تم تحذير ${user.username}`)
  },
}