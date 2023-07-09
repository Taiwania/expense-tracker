const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  password: {
    // Under construction
  },
})

module.exports = mongoose.model('User', userSchema)
