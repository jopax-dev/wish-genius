const { auth } = require('express-oauth2-jwt-bearer')

const validateToken = auth({
  issuerBaseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE
})

module.exports = validateToken
