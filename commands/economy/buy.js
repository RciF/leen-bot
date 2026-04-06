const { SlashCommandBuilder } = require("discord.js")
const db = require("../../systems/databaseSystem")

const ITEMS = {
  vip: 1000,
  boost: 500
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("شراء عنصر")
    .addStringOption(o =>
      o.setName("item")
        .setDescription("اسم العنصر")
        .setRequired(true)
    ),

  async execute(interaction) {
    const id = interaction.user.id
    const item = interaction.options.getString("item")

    const price = ITEMS[item]

    if (!price) return interaction.reply("❌ غير موجود")

    const user = await db.query(
      "SELECT coins FROM users WHERE id=$1",
      [id]
    )

    if (!user.rows.length || user.rows[0].coins < price) {
      return interaction.reply("❌ فلوسك ما تكفي")
    }

    await db.query(
      "UPDATE users SET coins = coins - $1 WHERE id=$2",
      [price, id]
    )

    await interaction.reply(`✅ اشتريت ${item}`)
  },
}