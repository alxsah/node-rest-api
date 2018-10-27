const Booking = require('../models/booking');

const getAllBookings = (req, res, next) => {
  Booking.find({userId: req.payload._id})
      .select('name date')
      .exec()
      .then((bookings) => res.status(200).json(bookings))
      .catch((err) => next(err));
};

const getBooking = (req, res, next) => {
  Booking.findById(req.params.id)
      .select('name date')
      .exec()
      .then((booking) => {
        if (booking) {
          res.status(200).json(booking);
        } else {
          res.status(res.status(204).send('Booking not found'));
        }
      })
      .catch((err) => next(err));
};

const createBooking = (req, res, next) => {
  const booking = new Booking({
    userId: req.payload._id,
    name: req.body.name,
    date: req.body.date,
  });

  booking.save()
      .then(() => res.status(201).send('Created booking successfully.'))
      .catch((err) => {
        console.log(err);
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
