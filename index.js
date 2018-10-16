const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const config = require('./config.json');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
  console.log('service running on port ', server.address().port);
});
