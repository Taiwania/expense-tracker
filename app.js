// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Express
const express = require('express')
const app = express()

// Import the mongoose
require('./config/mongoose')

// Define the router
const router = require('./routes')

// Define and import Handlebars engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Import router
app.use(router)

// Port listener
app.listen(process.env.PORT, () => {
  console.log(`The website http://localhost:${process.env.PORT} is running.`)
})
