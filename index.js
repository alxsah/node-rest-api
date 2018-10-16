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
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use((err, req, res, next) => {
  if (err) {
    console.log('Invalid Request data');
    res.status(400).send('Invalid Request data');
  } else {
    next();
  }
});

routes(app);

const server = app.listen(config.development.app_port, () => {
  console.log('Service running on port ', server.address().port);
});
