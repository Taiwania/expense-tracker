// Set Express and router
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')

// Home
router.get('/', (req, res) => {
  res.render('index')
})

// Show the new expense input form
router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .then((categorys) => res.render('new', { categorys }))
    .catch((error) => console.log(error))
})

// Export
module.exports = router
