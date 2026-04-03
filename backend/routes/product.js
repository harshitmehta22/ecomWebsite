const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/getproduct', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ product: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

router.post('/addproduct', async (req, res) => {
  try {
    const { title, brand, description, price, color, size, image, stock } = req.body;
    const product = new Product({ title, brand, description, price, color, size, image, stock });
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Could not add product' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
