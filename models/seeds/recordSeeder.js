// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Import bcrypt
const bcrypt = require('bcryptjs')


// Import models
const Category = require('../category')
const Record = require('../record')
const User = require('../user')

// Import MongoDB config
const db = require('../../config/mongoose')

// Set the seed data
const SEED_USER = [
  {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    password: 'Alpha-Camp-202307',
  },
]
const RECORD_LIST = require('../recordSeeder.json').result

// Import the seed data
db.on('error', () => {
  console.log('MongoDB is not connected.')
})

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER[0].password, salt))
    .then((hash) =>
      User.create({
        username: SEED_USER[0].username,
        email: SEED_USER[0].email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id
      const promises = RECORD_LIST.map((recordItem) => {
        return Category.findOne({ name: recordItem.category }).then(
          (category) => {
            return Record.create({
              name: recordItem.name,
              date: recordItem.date,
              amount: recordItem.amount,
              categoryId: category._id,
              userId,
            })
          }
        )
      })
      return Promise.all(promises)
    })
    .then(() => {
      console.log('Record seed data created.')
      process.exit()
    })
})
