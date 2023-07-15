const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  password: {
    // Under construction
  },
})

module.exports = mongoose.model('User', userSchema)
