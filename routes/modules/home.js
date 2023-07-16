// Set Express and router
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// Set category icons
const CATEGORY = {
  '家居物業': 'fa-home',
  '交通出行': 'fa-shuttle-van',
  '休閒娛樂': 'fa-grin-beam',
  '餐飲食品': 'fa-utensils',
  '其他': 'fa-pen',
}

// Home
router.get('/', (req, res) => {
  Promise.all([
    Category.find({}).lean(),
    Record.find({}).populate('categoryId').lean(),
  ])
    .then(([categories, records]) => {
      records.forEach((record) => {
        let date = new Date(record.date)
        let year = date.getFullYear()
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let day = date.getDate().toString().padStart(2, '0')
        record.date = `${year}-${month}-${day}`
        record.categoryIcon = CATEGORY[record.categoryId.name]
      })
      res.render('index', { categories, records })
    })
    .catch(error => console.log(error))
})

// Show the new expense input form
router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((error) => console.log(error))
})

// Export
module.exports = router
