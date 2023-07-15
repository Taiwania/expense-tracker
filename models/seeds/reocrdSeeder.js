// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    password: 'Alpha-Camp-202307',
  }
]

db.on('error', () => {
  console.log('MongoDB is not connected.')
})

db.once('open', () => {
  Category.create(seedCategory)
  console.log('The data of restaurants is imported.')
  process.exit()
})
