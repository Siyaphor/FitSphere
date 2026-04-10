const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  plan: String,
  planStartDate: Date,
  planEndDate: Date,
  profilePicture: String,
  password: String,
  role: { type: String, default: 'member' },

  bmi: Number,
  currentWeight: Number,
  height: Number

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // ✅ capital 
