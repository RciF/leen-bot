const { SlashCommandBuilder } = require("discord.js")
const db = require("../../systems/databaseSystem")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transfer")
    .setDescription("تحويل فلوس")
    .addUserOption(o =>
      o.setName("user").setDescription("المستلم").setRequired(true)
    )
    .addIntegerOption(o =>
      o.setName("amount").setDescription("المبلغ").setRequired(true)
    ),

  async execute(interaction) {
    const sender = interaction.user.id
    const target = interaction.options.getUser("user")
    const amount = interaction.options.getInteger("amount")

    if (amount <= 0) return interaction.reply("❌ مبلغ غير صالح")
    if (target.id === sender) return interaction.reply("❌ نفسك؟")

    const res = await db.query(
      "SELECT coins FROM users WHERE id=$1",
      [sender]
    )

    if (!res.rows.length || res.rows[0].coins < amount) {
      return interaction.reply("❌ ما عندك فلوس")
    }

    await db.query(
      "UPDATE users SET coins = coins - $1 WHERE id=$2",
      [amount, sender]
    )

    await db.query(
      "INSERT INTO users(id, coins) VALUES($1,$2) ON CONFLICT (id) DO UPDATE SET coins = users.coins + $2",
      [target.id, amount]
    )

    await interaction.reply(`💸 تم تحويل ${amount} لـ ${target.username}`)
  },
}