// Set Express and router
const express = require('express')
const router = express.Router()

// Home
router.get('/', (req, res) => {
  res.render('index')
})

// Show the new expense input form
router.get('/new', (req, res) => {
  res.render('new')
})

// Export
module.exports = router
