const Booking = require('../models/booking');

const getAllBookings = (req, res) => {
  Booking.find({}, (err, bookings) => {
    if (err) return next(err);
    res.status(200).send(bookings);
  });
};

const getBooking = (req, res) => {
  Booking.findById(req.params.id, (err, booking) => {
    if (err) return next(err);
    res.status(200).send(booking);
  });
};

const createBooking = (req, res) => {
  const booking = new Booking({
    name: req.body.name,
    date: req.body.date,
  });

  booking.save((err) => {
    if (err) return next(err);
  });
  res.status(201).send('Created booking successfully.');
};

const deleteBooking = (req, res) => {
  Booking.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
  });
  res.status(200).send('Deleted booking successfully.');
};

const updateBooking = (req, res) => {
  const booking = new Booking({
    name: req.body.name,
    date: req.body.date,
  });
  Booking.findByIdAndUpdate(req.params.id, booking, (err) => {
    if (err) return next(err);
  });
  res.status(200).send('Deleted booking successfully.');
};

module.exports = {getAllBookings, getBooking, createBooking, deleteBooking, updateBooking};
