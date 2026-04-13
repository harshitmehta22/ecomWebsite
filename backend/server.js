const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/users');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const allowedOrigins = [
  process.env.CLIENT_ORIGIN || 'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins in development; lock down for production
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Ecom backend running' });
});

const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecomWebsite';

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected:', mongoUri);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
