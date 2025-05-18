const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  surname:    { type: String, required: true },
  phone:      { type: String, required: true },
  email:      { type: String, required: true },
  city:       { type: String, required: true },
  address:    { type: String, required: true },
  index:      { type: String, required: true },
  payment:    { type: String, enum: ['card','cash','paypal'], required: true },
  cardholder: { type: String },     // лише якщо payment==='card'
  cardNumber: { type: String },     // лише якщо payment==='card'
  expiryDate: { type: String },     // лише якщо payment==='card'
  ccv:        { type: String },     // лише якщо payment==='card'
  totalSum:   { type: Number, required: true },
  shipping:   { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema, 'orders');