const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const config = require('./config.json');

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

