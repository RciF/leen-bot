const { SlashCommandBuilder } = require("discord.js")
const OpenAI = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ai")
    .setDescription("AI chat")
    .addStringOption(o =>
      o.setName("text").setDescription("text").setRequired(true)
    ),

  async execute(interaction) {
    const text = interaction.options.getString("text")

    await interaction.deferReply()

    const res = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: text }],
    })

    await interaction.editReply(res.choices[0].message.content)
  },
}