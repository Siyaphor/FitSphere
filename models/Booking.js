const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  serviceTitle: {
    type: String,
    required: true,
    trim: true
  },
  preferredDate: {
    type: String,
    required: true,
    trim: true
  },
  preferredTime: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    default: 'pending',
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
