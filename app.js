// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Express
const express = require('express')
const app = express()

// Main router
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Port listener
app.listen(process.env.PORT, () => {
  console.log(`The website http://localhost:${process.env.PORT} is running.`)
})