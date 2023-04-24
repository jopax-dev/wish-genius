const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization.toLowerCase().startsWith('bearer ')) {
    console.log('nope')
  }
  const token = authorization.substring(7)
  const decodedToken = jwt.decode(token)
  const userId = decodedToken.sub.split('|')[1]
  const email = decodedToken['https:email']
  const name = decodedToken['https:user']

  req.body.name = name
  req.body.userId = userId
  req.body.email = email

  next()
}
