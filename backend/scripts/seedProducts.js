const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecomWebsite';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    console.log('Database is ready. Products will be managed through the admin panel.');
    console.log('To add products: Go to Admin Dashboard > Products > Add New Product');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Connection failed', err);
    process.exit(1);
  });
