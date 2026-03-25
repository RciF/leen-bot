const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

module.exports = {
  connect: async () => {
    await pool.query("SELECT NOW()")
    console.log("✅ Database connected")
  },
  query: (text, params) => pool.query(text, params),
}