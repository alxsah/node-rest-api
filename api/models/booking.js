const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true, max: 50},
  datetime: {type: Date, required: true},
  description: {type: String, required: true, max: 100},
});

module.exports = mongoose.model('Booking', BookingSchema);
