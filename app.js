// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = process.env.MONGODB_URI;

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      saveUninitialized: false,
      resave: true,
      store: MongoStore.create({
        mongoUrl: DB_URL
      })
    })
  )

const User = require('./models/User.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(dbUser => {
            done(null, dbUser);
        })
        .catch(err => {
            done(err);
        });
    });

passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username })
        .then(userFromDB => {
          if (userFromDB === null) {
            done(null, false, { message: 'User not found' });
          } else if (!bcrypt.compareSync(password, userFromDB.password)) {
            done(null, false, { message: 'Incorrect username or password' });
          } else {
            done(null, userFromDB)
          }
        })
        .catch(err => {
          next(err);
        })
    })
  )
  
app.use(passport.initialize());
app.use(passport.session());

const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});
  

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const trainers = require("./routes/index");
app.use("/api/trainers", trainers);

const auth = require('./routes/auth')
app.use('/api/auth', auth);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
