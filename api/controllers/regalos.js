const regalosRoute = require('express').Router()
const Regalo = require('../models/Regalo')
const Lista = require('../models/Lista')
const User = require('../models/User')
const handleLogin = require('../middleware/handleLogin')
const validateToken = require('../middleware/validateToken')

regalosRoute.get('/:list', async (request, response) => {
  const { list } = request.params
  const regalos = await Regalo.find({ list })
    .populate({
      path: 'uid',
      select: 'name',
      model: 'User'
    })
    .populate({
      path: 'cid',
      select: 'name',
      model: 'User'
    })
  response.status(200).json(regalos)
})

regalosRoute.post('/', validateToken, handleLogin, async (request, response, next) => {
  if (Object.keys(request.body).length === 0) {
    return response.status(400).json({
      error: 'missing content'
    })
  }
  const { userId, price, url, list, nombre } = request.body
  const lista = await Lista.findById(list)
  const user = await User.findOne({ userId })

  if (!lista) return response.status(404).json({ error: 'list doesn\'t exist' })
  const newRegalo = new Regalo({
    uid: user._id,
    price,
    url,
    nombre,
    list
  })
  try {
    const savedRegalo = await newRegalo.save()
    lista.regalos = lista.regalos.concat(savedRegalo.id)
    await lista.save()
    console.log('Created new item: ', savedRegalo.id)
    response.status(201).json(savedRegalo)
  } catch (error) {
    next(error)
  }
})

regalosRoute.put('/:id', validateToken, handleLogin, async (request, response, next) => {
  const { id } = request.params
  const { userId } = request.body
  const gift = await Regalo.findById(id)
  if (gift.cid) return response.status(409).json('El regalo ya ha sido adjudicado')
  const user = await User.findOne({ userId })
  const cid = user.id
  try {
    const regalo = await Regalo.findByIdAndUpdate({ _id: id }, { cid }, { new: true })
    console.log('Updated item with id: ', id, ' now assigned to: ', cid)
    return response.status(200).json(regalo)
  } catch (error) { next(error) }
})

regalosRoute.delete('/:id', validateToken, handleLogin, async (request, response, next) => {
  const id = request.params.id
  try {
    await Regalo.findByIdAndDelete(id)

    const lista = await Lista.findOne({ regalos: id })
    if (!lista) {
      return response.status(404).json('El regalo no existe')
    }
    const newRegalos = lista.regalos.filter(regalo => regalo.toString() !== id)
    lista.regalos = newRegalos
    await lista.save()

    console.log('Deleted item with id: ', id)
    response.status(204).end()
  } catch (error) { next(error) }
})

module.exports = regalosRoute
