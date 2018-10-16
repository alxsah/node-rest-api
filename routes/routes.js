const db = require('../db.js');

const appRouter = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send('rest API test');
  });

  // Get all bookings
  app.get('/bookings', (req, res) => {
    console.log('getting all bookings');
    db.getBookings()
        .then((bookingsObj) => {
          console.log(bookingsObj);
          res.status(200).send(bookingsObj);
        })
        .catch((err) => {
          console.log(err);
        });
  });

  // Get a specific booking
  app.get('/bookings/:id', (req, res) => {
    console.log(`getting booking with id ${req.params.id}`);
    db.getBooking(req.params.id)
        .then((bookingsObj) => {
          console.log(bookingsObj);
          res.status(200).send(bookingsObj);
        })
        .catch((err) => {
          console.log(err);
        });
  });

  // Add booking
  app.post('/bookings', (req, res) => {
    console.log('posting booking');
    db.postBooking(req.body)
        .then(() => {
          res.status(201).send('Success!');
        })
        .catch((err) => {
          console.log(err);
        });
  });

  // Delete booking
  app.delete('/bookings/:id', (req, res) => {
    console.log(`deleting booking with id ${req.params.id}`);
    db.deleteBooking(req.params.id).then(() => {
      res.status(200).send('Success!');
    }).catch((err) => {
      console.log(err);
    });
  });

  // Update booking
  app.put('/bookings/:id', (req, res) => {
    console.log(`Updating booking with id ${req.params.id}`);
    db.updateBooking(req.params.id, req.body)
        .then(() => {
          res.status(200).send('Success!');
        })
        .catch((err) => {
          console.log(err);
        });
  });
};

module.exports = appRouter;
