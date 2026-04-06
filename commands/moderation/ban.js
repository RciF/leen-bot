const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("حظر عضو")
    .addUserOption(o =>
      o.setName("user").setDescription("العضو").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user")
    const member = await interaction.guild.members.fetch(user.id).catch(() => null)

    if (!member) return interaction.reply("❌ غير موجود")

    await member.ban()

    await interaction.reply(`🚫 تم حظر ${user.username}`)
  },
}