const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes/routes');
const config = require('./config');
require('./config/passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
});

app.use(passport.initialize());
routes(app);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({message: `${err.name}:${err.message}`});
  }
});

app.use((err, req, res, next) => {
  if (err) res.status(500).send('Internal server error');
});

app.on('ready', () => {
  const server = app.listen(config.development.app_port, () => {
    console.log('Service running on port ', server.address().port);
  });
});

