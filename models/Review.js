const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  rating:    { type: Number, required: true, min: 1, max: 5 },
  message:   { type: String, required: true },
  createdAt: { type: Date,   default: Date.now }
});

// колекція називатиметься 'reviews'
module.exports = mongoose.model('Review', reviewSchema, 'reviews');