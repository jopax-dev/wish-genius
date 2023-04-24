const pagosRouter = require('express').Router()
const handleLogin = require('../middleware/handleLogin')
const Lista = require('../models/Lista')
const Regalo = require('../models/Regalo')
const User = require('../models/User')
const validateToken = require('../middleware/validateToken')

pagosRouter.post('/', validateToken, handleLogin, async (request, response, next) => {
  const { giftId: regaloId, list, applicant: propietarioId, userId, paid: pagado, toPay: aPagar } = request.body
  const lista = await Lista.findOne({ _id: list })
  const { userList } = lista
  const user = await User.findOne({ userId })
  const uid = user.id
  const updatedList = userList
    .map(user => {
      console.log(user)
      if ((user.user.toString() !== uid) && (user.user.toString() !== propietarioId)) {
        if (user.aPagar.some(obj => obj.usuarioAPagar.toString() === uid)) {
          user.aPagar.forEach(apagar => {
            if (apagar.usuarioAPagar.toString() === uid) {
              apagar.cantidadAPagar += aPagar
            }
          })
        } else {
          user.aPagar = user.aPagar.concat({
            usuarioAPagar: uid,
            cantidadAPagar: aPagar
          })
        }
      }

      if (user.user.toString() === uid) {
        user.pagado += pagado
      }

      return user
    })
  try {
    await Lista.updateOne({ _id: list }, { userList: updatedList })
    await Regalo.findByIdAndUpdate({ _id: regaloId }, { comprado: true })
    console.log(`Regalo ${regaloId} para ${propietarioId} en la lista ${list} comprado por el usuario ${userId} por ${pagado}€`)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

pagosRouter.put('/:regaloId', handleLogin, async (request, response, next) => {
  const { regaloId } = request.params
  const { userId } = request.body
  try {
    await Regalo.findByIdAndUpdate({ _id: regaloId }, { comprado: true })
    console.log(`El usuario ${userId} ha comprado el regalo ${regaloId}`)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = pagosRouter
