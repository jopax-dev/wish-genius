const giftsRoute = require('express').Router()
const Gift = require('../models/Gift')
const List = require('../models/List')
const User = require('../models/User')
const handleLogin = require('../middleware/handleLogin')
const validateToken = require('../middleware/validateToken')

// giftsRoute.get('/:list', async (request, response) => {
//   const { list } = request.params
//   const gifts = await Gift.find({ list })
//     .populate({
//       path: 'uid',
//       select: 'name',
//       model: 'User'
//     })
//     .populate({
//       path: 'cid',
//       select: 'name',
//       model: 'User'
//     })
//   response.status(200).json(gifts)
// })

giftsRoute.post('/', validateToken, handleLogin, async (request, response, next) => {
  if (Object.keys(request.body).length === 0) {
    return response.status(400).json({
      error: 'missing content'
    })
  }

  const { userId, price, url, listId, present, toOther } = request.body

  const list = await List.findById(listId)
  const user = await User.findOne({ userId })

  if (!list) return response.status(404).json({ error: 'list doesn\'t exist' })

  const newGift = new Gift({
    uid: user._id,
    price,
    url,
    present,
    listId,
    toOther
  })
  try {
    const savedGift = await newGift.save()
    list.regalos = list.regalos.concat(savedGift.id)
    await list.save()
    console.log('Created new item: ', savedGift.id)
    response.status(201).json(savedGift)
  } catch (error) {
    next(error)
  }
})

giftsRoute.put('/:id', validateToken, handleLogin, async (request, response, next) => {
  const { id } = request.params
  const { userId } = request.body

  const gift = await Gift.findById(id)
  if (gift.cid) return response.status(409).json('El regalo ya ha sido adjudicado')

  const user = await User.findOne({ userId })
  const cid = user.id

  try {
    const updatedGift = await Gift.findByIdAndUpdate({ _id: id }, { cid }, { new: true })
    console.log('Updated item with id: ', id, ' now assigned to: ', cid)
    return response.status(200).json(updatedGift)
  } catch (error) { next(error) }
})

giftsRoute.delete('/:id', validateToken, handleLogin, async (request, response, next) => {
  const id = request.params.id
  try {
    await Gift.findByIdAndDelete(id)

    const list = await List.findOne({ regalos: id })
    if (!list) {
      return response.status(404).json('El regalo no existe')
    }
    const updatedGiftList = list.regalos.filter(present => present.toString() !== id)
    list.regalos = updatedGiftList
    await list.save()

    console.log('Deleted item with id: ', id)
    response.status(204).end()
  } catch (error) { next(error) }
})

module.exports = giftsRoute
