// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
const seedCategory = [
  { name: '家居物業' },
  { name: '交通出行' },
  { name: '休閒娛樂' },
  { name: '餐飲食品' },
  { name: '其他' },
]

db.on('error', () => {
  console.log('MongoDB is not connected.')
})

db.once('open', () => {
  return Category.insertMany(seedCategory)
    .then(() => {
      console.log('The default categories is imported.')
      process.exit()
    })
    .catch((error) => console.log(error))
})
