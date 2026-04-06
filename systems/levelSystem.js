const db = require("./databaseSystem")

async function addXP(userId) {
  await db.query(`
    INSERT INTO users(id, coins, xp, level)
    VALUES ($1, 0, 10, 1)
    ON CONFLICT (id)
    DO UPDATE SET xp = users.xp + 10
  `, [userId])

  const res = await db.query(
    "SELECT xp, level FROM users WHERE id=$1",
    [userId]
  )

  const user = res.rows[0]

  if (user.xp >= user.level * 100) {
    await db.query(
      "UPDATE users SET level = level + 1, xp = 0 WHERE id=$1",
      [userId]
    )
    return true
  }

  return false
}

module.exports = { addXP }