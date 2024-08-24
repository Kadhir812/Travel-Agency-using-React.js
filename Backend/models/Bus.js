const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  busName: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Bus', BusSchema);
