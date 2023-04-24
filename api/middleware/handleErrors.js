const ERROR_HANDLER = {
  CastError: response => response.status(400).send({ Error: 'Invalid ID' }),

  ValidationError: response => response.status(400).send({ Error: 'Usuario or email already used' }),

  JsonWebTokenError: response => response.status(401).json({ Error: 'Token missing or invalid ' }),

  TokenExpiredError: response => response.status(401).send({ Error: 'Token has expired' }),

  DefaultError: response => response.status(500).send('Ups, something went wrong')

}

module.exports = (error, request, response, next) => {
  console.log(error)
  const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.DefaultError
  handler(response)
}
