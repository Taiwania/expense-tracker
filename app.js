// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Express
const express = require('express')
const app = express()

// Import user authentication patches
const session = require('express-session')
const usePassport = require('./config/passport')

// Import the mongoose
require('./config/mongoose')

// Import the router
const router = require('./routes')

// Import and use Handlebars engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Use the user authentication patches
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
usePassport(app)

// Import body-parser
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Set res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// Use router and css
app.use(router)
app.use('/css', express.static('css'))

// Port listener
app.listen(process.env.PORT, () => {
  console.log(`The website http://localhost:${process.env.PORT} is running.`)
})
