const bookingController = require('../controllers/booking');

const appRouter = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send('rest API test');
  });

  // Get all bookings
  app.get('/bookings', bookingController.getAllBookings);

  // Get a specific booking
  app.get('/bookings/:id', bookingController.getBooking);

  // Add booking
  app.post('/bookings', bookingController.createBooking);

  // Delete booking
  app.delete('/bookings/:id', bookingController.deleteBooking);

  // Update booking
  app.put('/bookings/:id', bookingController.updateBooking);

  app.get('*', (req, res) => {
    res.status(404).send('Endpoint not found.');
  });
};

module.exports = appRouter;
