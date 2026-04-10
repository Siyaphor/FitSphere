const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  plan: {
    type: String,
    trim: true
  },
  goal: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['enquiry', 'contact'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
