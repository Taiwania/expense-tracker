// Set Express and router
const express = require('express')
const router = express.Router()

// Import routes
const home = require('./modules/home')

// Set routes
router.use('/', home)

// Export
module.exports = router