// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Import mongoose and bcrypt
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

// Import models
const Category = require('../category')
const Record = require('../record')
const User = require('../user')

// Set the seed data
const SEED_USER = [
  {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    password: 'Alpha-Camp-202307',
  }
]
const RECORD_LIST = require('../recordSeeder').result

// Import the seed data
db.on('error', () => {
  console.log('MongoDB is not connected.')
})

db.once('open', () => {
  console.log('The data of restaurants is imported.')
  process.exit()
})
