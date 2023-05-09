const loginRouter = require('express').Router()
const User = require('../models/User')
const validateToken = require('../middleware/validateToken')
const handleLogin = require('../middleware/handleLogin')

loginRouter.post('/', validateToken, handleLogin, async (request, response) => {
  console.log(request.body)
  const { name, email, userId } = request.body

  const user = await User.findOne({ email })

  if (user) return response.status(409).send('User already exists')

  const newUser = new User({
    userId,
    name,
    email
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = loginRouter
