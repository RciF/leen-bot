const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const ITEMS = [
  { id: "vip", name: "⭐ VIP", price: 1000 },
  { id: "boost", name: "🚀 Boost", price: 500 }
]

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("عرض المتجر"),

  async execute(interaction) {
    const text = ITEMS
      .map(i => `• ${i.name} — ${i.price} coins`)
      .join("\n")

    const embed = new EmbedBuilder()
      .setTitle("🛒 Shop")
      .setDescription(text)

    await interaction.reply({ embeds: [embed] })
  },
}