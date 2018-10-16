const bookingController = require('../controllers/booking');

const appRouter = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send('rest API test');
  });

  // Get all bookings
  app.get('/bookings', bookingController.getAllBookings);

  // Get a specific booking
  app.get('/bookings/:id', (req, res) => bookingController.getBooking);

  // Add booking
  app.post('/bookings', (req, res) => bookingController.createBooking);

  // Delete booking
  app.delete('/bookings/:id', (req, res) => bookingController.deleteBooking);

  // Update booking
  app.put('/bookings/:id', (req, res) => bookingController.updateBooking);
};

module.exports = appRouter;
