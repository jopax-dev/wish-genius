const listRouter = require('express').Router()
const Lista = require('../models/Lista')
const User = require('../models/User')
const handleLogin = require('../middleware/handleLogin')
const generateRandomHash = require('./helpers')
const validateToken = require('../middleware/validateToken')
const Regalo = require('../models/Regalo')

listRouter.get('/', validateToken, handleLogin, async (request, response) => {
  const { userId } = request.body
  const user = await User.findOne({ userId })
  const { lists } = user
  const listPromises = lists.map(async (list) => {
    const data = await Lista.findById(list).select('_id title')
    if (data) {
      return (data)
    }
  })

  const listsWithItems = await Promise.all(listPromises)
  response.status(200).json(listsWithItems)
})

listRouter.get('/:list', validateToken, handleLogin, async (request, response) => {
  const { list } = request.params
  try {
    const reqList = await Lista.findOne({ _id: list })
      .populate({
        path: 'userList.user',
        select: 'name userId id email',
        model: 'User'
      })
      .populate({
        path: 'userList.aPagar.usuarioAPagar',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'regalos',
        select: 'uid cid nombre price comprado url toOther',
        model: 'Regalo'
      })
    response.status(200).json(reqList)
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})

listRouter.post('/', validateToken, handleLogin, async (request, response, next) => {
  if (Object.keys(request.body).length === 0) {
    return response.status(400).json({
      error: 'missing content'
    })
  }

  const { userId, title, userList, regalos } = request.body
  const hash = await generateRandomHash()

  const user = await User.findOne({ userId })
  const updatedUserlist = userList.concat({ user: user._id, aPagar: [], pagado: 0 })

  try {
    const newList = new Lista({
      title,
      userList: updatedUserlist,
      regalos,
      hash
    })

    const savedList = await newList.save()
    user.lists = user.lists.concat(savedList._id)
    await user.save()

    console.log('New list created: ', savedList.id)

    response.status(201).json(savedList.id)
  } catch (error) {
    next(error)
  }
})

listRouter.delete('/:id', validateToken, handleLogin, async (request, response, next) => {
  const id = request.params.id
  try {
    const lista = await Lista.findById(id)

    if (!lista) return response.status(404).json({ Error: 'la lista no existe' })

    const pendingGifts = await Regalo.find({ list: id, comprado: false })
    if (pendingGifts.length > 0) {
      return response.status(403).json({ Error: 'la lista aun tiene regalos por comprar' })
    }
    await Lista.findByIdAndDelete(id)
    await User.updateMany(
      { lists: id },
      { $pull: { lists: id } }
    )

    console.log('Deleted list with id: ', id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = listRouter
