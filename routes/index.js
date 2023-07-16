// Set Express and router
const express = require('express')
const router = express.Router()

// Import routes
const home = require('./modules/home')
const user = require('./modules/user')

// Set routes
router.use('/', home)
router.use('/user', user)

// Export
module.exports = router