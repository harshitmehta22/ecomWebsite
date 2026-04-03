const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  color: { type: String },
  size: { type: String },
  image: { type: String },
  stock: { type: Number, default: 100 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
