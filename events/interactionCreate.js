const { isOnCooldown } = require("../systems/cooldownSystem")

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    if (isOnCooldown(interaction.user.id, interaction.commandName)) {
      return interaction.reply({ content: "⏳ انتظر", ephemeral: true })
    }

    try {
      await command.execute(interaction, client)
    } catch {
      await interaction.reply({ content: "❌ Error", ephemeral: true })
    }
  },
}