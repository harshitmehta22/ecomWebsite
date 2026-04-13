const express = require('express');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/getproduct', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ product: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (error) {
    console.error('Error fetching product by id:', error);
    res.status(500).json({ error: 'Could not fetch product' });
  }
});

router.post('/addproduct', upload.single('image'), async (req, res) => {
  try {
    const { title, brand, description, price, originalPrice, color, size } = req.body;
    const image = req.file ? req.file.filename : '';
    const stock = req.body.stock || 100;
    const product = new Product({ title, brand, description, price, originalPrice, color, size: JSON.parse(size), image, stock });
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Could not add product' });
  }
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    if (updateData.size) {
      updateData.size = JSON.parse(updateData.size);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Could not update product' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Could not delete product' });
  }
});

module.exports = router;
