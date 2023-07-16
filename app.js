// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Express
const express = require('express')
const app = express()

// Import related patches
const session = require('express-session')

// Import the mongoose
require('./config/mongoose')

// Import the router
const router = require('./routes')

// Define and use Handlebars engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Use the patches
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// Use router and css
app.use(router)
app.use('/css', express.static('css'))

// Port listener
app.listen(process.env.PORT, () => {
  console.log(`The website http://localhost:${process.env.PORT} is running.`)
})
