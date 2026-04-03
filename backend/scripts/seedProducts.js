const mongoose = require('mongoose');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
  {
    title: 'Classic Sneakers',
    brand: 'Adidas',
    description: 'Comfortable and stylish sneakers.',
    price: 80,
    color: 'white',
    size: 'M',
    image: 'default-product.jpg',
    stock: 50,
  },
  {
    title: 'Running Shoes',
    brand: 'Nike',
    description: 'High performance running shoes.',
    price: 120,
    color: 'black',
    size: 'L',
    image: 'default-product.jpg',
    stock: 30,
  },
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecomWebsite';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to Mongo for seeding');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded; total', products.length);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed failed', err);
    process.exit(1);
  });
