const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.connect('process.env.MONGODB_URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB is not connected.')
})

db.once('open', () => {
  console.log('MongoDB is connected!')
})

module.exports = db
