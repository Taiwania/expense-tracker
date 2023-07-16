// Set Express and router
const express = require('express')
const router = express.Router()

// Import routes
const home = require('./modules/home')
const users = require('./modules/users')

// Import authentication
const { authenticator } = require('../middleware/auth')

// Set routes
router.use('/users', users)
router.use('/', authenticator, home)

// Export
module.exports = router