const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("طرد عضو")
    .addUserOption(o =>
      o.setName("user").setDescription("العضو").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user")
    const member = await interaction.guild.members.fetch(user.id).catch(() => null)

    if (!member) return interaction.reply("❌ غير موجود")

    await member.kick()

    await interaction.reply(`👢 تم طرد ${user.username}`)
  },
}