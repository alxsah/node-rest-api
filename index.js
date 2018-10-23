const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes/routes');
const config = require('./config');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport config
passport.use(new LocalStrategy({
  usernameField: 'username',
},
(username, password, done) => {
  User.findOne({username}, (err, user) => {
    if (err) return done(err);
    // Return if user not found in database
    if (!user) {
      return done(null, false, {
        message: 'User not found',
      });
    }
    // Return if password is wrong
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password',
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
}
));

// Set up database connection
const dbUrl = `mongodb://${config.development.mongo_hostname}:${config.development.mongo_port}/`;
mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once('open', () => {
  app.emit('ready');
});

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send('Invalid Request data');
  } else {
    next();
  }
});

app.use(passport.initialize());
routes(app);

app.use((err, req, res, next) => {
  if (err) res.status(500).send('Internal server error');
});

app.on('ready', () => {
  const server = app.listen(config.development.app_port, () => {
    console.log('Service running on port ', server.address().port);
  });
});

