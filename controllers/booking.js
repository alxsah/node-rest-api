const Booking = require('../models/booking');

const getAllBookings = (req, res, next) => {
  Booking
      .find({requsername})
      .select('name date')
      .then((err, bookings) => {
        if (err) return next(err);
        res.status(200).send(bookings);
      });
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
  const booking = new Booking({
    name: req.body.name,
    date: req.body.date,
  });

  Booking.findByIdAndUpdate(req.params.id, {
    name: booking.name,
    date: booking.date,
  },
  (err) => {
    if (err) return next(err);
  });
  res.status(200).send('Updated booking successfully.');
};

module.exports = {getAllBookings, getBooking, createBooking, deleteBooking, updateBooking};
