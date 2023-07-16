// Set Express and router
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

// Show login page
router.get('/login', (req, res) => {
  res.render('login')
})

// Show register page
router.get('/register', (req, res) => {
  res.render('register')
})

// Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
  })
)

// Logout
router.get('/logout', function (req, res, next) {
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.redirect('/users/login')
  })
})

// Register
router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        username,
        email,
        password,
        confirmPassword,
      })
    } else if (password !== confirmPassword) {
      console.log('Passwords do not match.')
      res.render('register', {
        username,
        email,
        password,
        confirmPassword,
      })
    } else {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          User.create({
            username,
            email,
            password: hash,
          })
        })
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
    }
  })
})

module.exports = router
