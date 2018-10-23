const Booking = require('../models/booking');

const getAllBookings = (req, res, next) => {
  Booking
      .find({username: req.body.username})
      .select('name date')
      .exec()
      .then(() => res.status(200).send(bookings))
      .catch(() => next(err));
};

const getBooking = (req, res, next) => {
  Booking.findById(req.params.id, (err, booking) => {
    if (err) return next(err);
    if (!booking) {
      res.status(204).send('Booking not found');
    } else {
      res.status(200).send(booking);
    }
  });
};

const createBooking = (req, res, next) => {
  const booking = new Booking({
    username: req.body.username,
    name: req.body.name,
    date: req.body.date,
  });

  booking.save((err) => {
    if (err) return next(err);
  });
  res.status(201).send('Created booking successfully.');
};

const deleteBooking = (req, res, next) => {
  Booking.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
  });
  res.status(200).send('Deleted booking successfully.');
};

const updateBooking = (req, res, next) => {
  Booking.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    name: req.body.name,
    date: req.body.date,
  },
  (err) => {
    if (err) return next(err);
  });
  res.status(200).send('Updated booking successfully.');
};

module.exports = {getAllBookings, getBooking, createBooking, deleteBooking, updateBooking};
