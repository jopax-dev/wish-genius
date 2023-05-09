const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }]
})

userSchema.set('toJSON', {
  transform: (document, object) => {
    object.uid = object._id
    delete object._id
    delete object.__v
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
