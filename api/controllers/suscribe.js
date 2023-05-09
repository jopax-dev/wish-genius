const suscribeRouter = require('express').Router()
const List = require('../models/List')
const User = require('../models/User')
const handleLogin = require('../middleware/handleLogin')
const validateToken = require('../middleware/validateToken')
const generateRandomHash = require('./helpers')

suscribeRouter.post('/:id', validateToken, handleLogin, async (request, response, next) => {
  const { id } = request.params

  const list = await List.findById({ _id: id })
  if (!list) { return response.status(404).json({ Error: 'list not found' }) }

  const { _id, hash } = list
  const invitationHash = await generateRandomHash()

  await List.findByIdAndUpdate({ _id }, { $push: { invitationHash } }, { new: true })

  const data = {
    hash,
    invitationHash
  }
  return response.status(201).json(data)
})

suscribeRouter.post('/:hash/:invitationHash', validateToken, handleLogin, async (request, response, next) => {
  const { hash, invitationHash } = request.params
  const { userId } = request.body

  const user = await User.findOne({ userId })
  const idUser = user._id
  const returnedList = await List.findOne({ hash, invitationHash: { $in: [invitationHash] } })

  if (!returnedList) { return response.status(404).json('Error: no es posible acceder a esa lista') }
  if (returnedList.userList.some(user => user.user.toHexString() === idUser)) { return response.status(409).end() }

  const listId = returnedList._id
  try {
    const updatedList = await List.findByIdAndUpdate(
      { _id: listId },
      {
        $pull: { invitationHash },
        $push: { userList: { user: idUser, pagado: 0, aPagar: [] } }
      },
      { new: true }
    )

    const updatedUser = await User.findByIdAndUpdate({ _id: idUser }, { $push: { lists: listId } }, { new: true })
    console.log('User: ', updatedUser._id, ' added to list: ', listId)
    response.status(200).json(updatedList.id)
  } catch (error) { next(error) }
})

module.exports = suscribeRouter
