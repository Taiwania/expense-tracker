const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

module.exports = (app) => {
  // Init Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // Set local login strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'That email is not registered!',
            })
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'Email or Password incorrect.' })
            }
            return done(null, user)
          })
        })
        .catch((err) => done(err, false))
    })
  )
  // Set serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
