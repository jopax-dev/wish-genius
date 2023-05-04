const validateToken = require('../middleware/validateToken')
const handleLogin = require('../middleware/handleLogin')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/:list', validateToken, async (request, response) => {
  const { list } = request.params
  const users = await User.find({ lists: { $in: list } })
  response.status(200).json(users)
})

userRouter.get('/', validateToken, handleLogin, async (request, response) => {
  const { userId } = request.body
  const user = await User.findOne({ userId })
  response.status(200).json(user.id)
})

userRouter.post('/', validateToken, handleLogin, async (request, response) => {
  const { name, email, userId } = request.body

  const user = await User.findOne({ email })

  if (user) return response.status(409).json('User already exists')

  const newUser = new User({
    userId,
    name,
    email
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter
