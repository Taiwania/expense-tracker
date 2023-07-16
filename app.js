// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Express
const express = require('express')
const app = express()

// Import patches
const session = require('express-session')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')

// Import the mongoose
require('./config/mongoose')

// Import the router
const router = require('./routes')

// Import and use Handlebars engine
const exphbs = require('express-handlebars')
const handlebars = exphbs.create({ defaultLayout: 'main' })
handlebars.handlebars.registerHelper('eq', (a, b) => {
  return a.toString() === b.toString()
})
app.engine('handlebars', handlebars.engine)
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

// Use body-parser and method-override
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Use connect-flash
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

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
