const { auth } = require('express-oauth2-jwt-bearer')

const validateToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE
})

module.exports = validateToken
