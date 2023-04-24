const { Schema, model } = require('mongoose')

const listaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userList: [{
    _id: false,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    aPagar: [{
      usuarioAPagar: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      cantidadAPagar: Number,
      _id: false
    }],
    pagado: Number
  }],
  regalos: [{
    type: Schema.Types.ObjectId,
    ref: 'Regalo'
  }],
  hash: {
    type: String,
    required: true
  },
  invitationHash: [{
    type: String
  }]
})

listaSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id
    delete object._id
    delete object.__v
  }
})

const Lista = model('Lista', listaSchema)

module.exports = Lista
