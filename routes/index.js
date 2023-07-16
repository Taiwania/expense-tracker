// Set Express and router
const express = require('express')
const router = express.Router()

// Import routes
const home = require('./modules/home')
const users = require('./modules/users')

// Set routes
router.use('/', home)
router.use('/users', users)

// Export
module.exports = router