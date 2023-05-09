const { Schema, model } = require('mongoose')

const giftSchema = new Schema({
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
  present: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },
  bought: {
    type: Boolean,
    default: false
  },
  toOther: {
    type: Boolean,
    default: false
  }
})

giftSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id
    delete object._id
    delete object.__v
  }
})

const Gift = model('Gift', giftSchema)

module.exports = Gift
