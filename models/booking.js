const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  name: {type: String, required: true, max: 50},
  date: {type: Date, required: true},
});

module.exports = mongoose.model('Booking', BookingSchema);
