const crypto = require('crypto')

async function generateRandomHash () {
  try {
    const buffer = await new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buffer) => {
        if (err) {
          reject(err)
        } else {
          resolve(buffer)
        }
      })
    })
    return buffer.toString('hex')
  } catch (err) {
    console.error(`Error generating random hash: ${err}`)
  }
}

module.exports = generateRandomHash
