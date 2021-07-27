const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/signup', (req, res, next) => {
    const { username, password, role } = req.body;
    console.log(req.body);
    if (password.length < 7) {
      return res.status(400).json({ message: 'Your password must be at least 7 characters' });
    }
    if (username === '') {
      return res.status(400).json({ message: 'Please enter username' });
    }
    User.findOne({ username: username })
      .then(found => {
        if (found !== null) {
          return res.status(400).json({ message: 'This username is taken' });
        } else {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);
    
            User.create({
                username: username,
                password: hash,
                role: role
            })
            .then(createdUser => {
              console.log(createdUser)
              req.login(createdUser, err => {
                if (err) {
                  return res.status(500).json({ message: 'Login failed. Please try again' })
                } else {
                    return res.json(createdUser);
                }
              });
            })
            .catch(err => res.json(err))
        }
      })
  });

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed. Please try again' })
      }
      if (!user) {
        return res.status(400).json({ message: 'Incorrect username or password' })
      }
      req.login(user, err => {
        if (err) {
          return res.status(500).json({ message: 'Login failed. Please try again' })
        }
        return res.json(user);
      })
    })(req, res)
  });

    
  router.get('/loggedin', (req, res) => {
    console.log('session user: ', req.user)
    res.json(req.user);
  });

  router.delete('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Sucessfully logged out' });
  })

  
  module.exports = router;