const moment = require('moment');
const Booking = require('../models/booking');

const formatBookings = (bookings) => {
  for (const booking of bookings) {
    booking.date = moment(booking.datetime).format('DD/MM/YYYY');
    booking.time = moment(booking.datetime).format('HH:mm');
    delete booking.datetime;
  };
  return bookings;
};

const getAllBookings = (req, res, next) => {
  Booking.find({userId: req.payload._id})
      .select('name datetime location')
      .lean()
      .exec()
      .then((bookings) => {
        bookings = formatBookings(bookings);
        return res.status(200).json(bookings);
      })
      .catch((err) => next(err));
};

const getBooking = (req, res, next) => {
  Booking.findById(req.params.id)
      .select('name datetime location')
      .lean()
      .exec()
      .then((booking) => {
        if (booking) {
          booking.date = moment(booking.datetime).format('DD/MM/YYYY');
          booking.time = moment(booking.datetime).format('HH:mm');
          delete booking.datetime;
          res.status(200).json(booking);
        } else {
          res.status(res.status(204).json({error: 'Booking not found'}));
        }
      })
      .catch((err) => next(err));
};

const createBooking = (req, res, next) => {
  const booking = new Booking({
    userId: req.payload._id,
    name: req.body.name,
    datetime: req.body.datetime,
    location: req.body.location,
  });

  booking.save()
      .then(() => res.status(201).send('Created booking successfully.'))
      .catch((err) => {
        return next(err);
      });
};

const deleteBooking = (req, res, next) => {
  Booking.findByIdAndRemove(req.params.id)
      .exec()
      .then(() => res.status(200).send('Deleted booking successfully.'))
      .catch((err) => next(err));
};

const updateBooking = (req, res, next) => {
  Booking.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    date: req.body.date,
  })
      .exec()
      .then(() => res.status(200).send('Updated booking successfully.'))
      .catch((err) => next(err));
};

module.exports = {getAllBookings, getBooking, createBooking, deleteBooking, updateBooking};
