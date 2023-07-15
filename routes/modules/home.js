// Set Express and router
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')

// Home
router.get('/', (req, res) => {
  Category.find({})
    .lean()
    .then((categories) => res.render('index', { categories }))
    .catch((error) => console.log(error))
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
