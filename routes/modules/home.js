// Set Express and router
const express = require('express')
const router = express.Router()

// Home
router.get('/', (req, res) => {
  res.render('index')
})

// Export
module.exports = router
