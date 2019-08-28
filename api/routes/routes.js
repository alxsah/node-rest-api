const jwt = require('express-jwt');

const config = require('../config');
const bookingController = require('../controllers/booking');
const loginController = require('../controllers/login');
const registerController = require('../controllers/register');

const auth = jwt({
  secret: config.development.jwt_secret,
  userProperty: 'payload',
  getToken: (req) => req.cookies.jwt,
});

const appRouter = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send('rest API test');
  });

  app.post('/login', loginController.login);

  app.post('/register', registerController.register);

  // Get all bookings
  app.get('/bookings', auth, bookingController.getAllBookings);

  // Get a specific booking
  app.get('/bookings/:id', auth, bookingController.getBooking);

  // Add booking
  app.post('/bookings', auth, bookingController.createBooking);

  // Delete booking
  app.delete('/bookings/:id', auth, bookingController.deleteBooking);

  // Update booking
  app.put('/bookings/:id', auth, bookingController.updateBooking);

  app.get('*', (req, res) => {
    res.status(404).send('Endpoint not found.');
  });
};

module.exports = appRouter;
