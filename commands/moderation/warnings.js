const { SlashCommandBuilder } = require("discord.js")
const db = require("../../systems/databaseSystem")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("عرض التحذيرات")
    .addUserOption(o =>
      o.setName("user").setDescription("العضو").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user")

    const res = await db.query(
      "SELECT reason FROM warns WHERE user_id=$1",
      [user.id]
    )

    if (!res.rows.length) {
      return interaction.reply("لا يوجد تحذيرات")
    }

    let text = `⚠️ تحذيرات ${user.username}:\n\n`

    res.rows.forEach((w, i) => {
      text += `${i + 1}. ${w.reason}\n`
    })

    await interaction.reply(text)
  },
}