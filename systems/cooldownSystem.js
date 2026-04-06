const cooldowns = new Map()

function isOnCooldown(userId, command, time = 3000) {
  const key = userId + "_" + command

  if (cooldowns.has(key)) {
    return true
  }

  cooldowns.set(key, true)

  setTimeout(() => {
    cooldowns.delete(key)
  }, time)

  return false
}

module.exports = { isOnCooldown }