const OpenAI = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

async function handleAI(message) {
  if (!message.content.startsWith("!ai")) return

  const text = message.content.replace("!ai", "").trim()
  if (!text) return

  const res = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: text }],
  })

  await message.reply(res.choices[0].message.content)
}

module.exports = { handleAI }