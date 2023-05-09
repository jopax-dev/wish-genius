const paymentsRouter = require('express').Router()
const handleLogin = require('../middleware/handleLogin')
const List = require('../models/List')
const Gift = require('../models/Gift')
const User = require('../models/User')
const validateToken = require('../middleware/validateToken')

paymentsRouter.post('/', validateToken, handleLogin, async (request, response, next) => {
  const { giftId, listId, applicant, userId, paid, toPay } = request.body
  const list = await List.findOne({ _id: listId })
  const { userList } = list
  const user = await User.findOne({ userId })
  const uid = user.id
  const updatedList = userList
    .map(user => {
      if ((user.user.toString() !== uid) && (user.user.toString() !== applicant)) {
        if (user.aPagar.some(obj => obj.usuarioAPagar.toString() === uid)) {
          user.aPagar.forEach(apagar => {
            if (apagar.usuarioAPagar.toString() === uid) {
              apagar.cantidadAPagar += toPay
            }
          })
        } else {
          user.aPagar = user.aPagar.concat({
            usuarioAPagar: uid,
            cantidadAPagar: toPay
          })
        }
      }

      if (user.user.toString() === uid) {
        user.pagado += paid
      }

      return user
    })
  try {
    await List.updateOne({ _id: list }, { userList: updatedList })
    await Gift.findByIdAndUpdate({ _id: giftId }, { bought: true })
    console.log(`Regalo ${giftId} para ${applicant} en la lista ${list} comprado por el usuario ${userId} por ${paid}€`)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

paymentsRouter.put('/:giftId', handleLogin, async (request, response, next) => {
  const { giftId } = request.params
  const { userId } = request.body
  try {
    await Gift.findByIdAndUpdate({ _id: giftId }, { bought: true })
    console.log(`El usuario ${userId} ha comprado el regalo ${giftId}`)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = paymentsRouter
