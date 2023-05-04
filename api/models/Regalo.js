const { Schema, model } = require('mongoose')

const regaloSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  price: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'Lista'
  },
  comprado: {
    type: Boolean,
    default: false
  },
  toOther: {
    type: Boolean,
    default: false
  }
})

regaloSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id
    delete object._id
    delete object.__v
  }
})

const Regalo = model('Regalo', regaloSchema)

module.exports = Regalo
