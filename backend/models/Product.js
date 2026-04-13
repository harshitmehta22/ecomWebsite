const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number }, // discount percentage
  color: { type: String },
  size: [{ type: String }], // Changed to array
  image: { type: String },
  stock: { type: Number, default: 100 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
