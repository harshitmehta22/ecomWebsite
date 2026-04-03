import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, IconButton
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '', brand: '', description: '', price: '', color: '', size: '', image: '', stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getproduct`);
      setProducts(response.data.product);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setEditing(product);
      setFormData(product);
    } else {
      setEditing(null);
      setFormData({ title: '', brand: '', description: '', price: '', color: '', size: '', image: '', stock: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        // For update, assuming backend has PUT /api/products/:id
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/products/${editing._id}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/addproduct`, formData);
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Assuming backend has DELETE /api/products/:id
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Products
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
        Add Product
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Title" name="title" value={formData.title} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Description" name="description" value={formData.description} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Color" name="color" value={formData.color} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Size" name="size" value={formData.size} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Image URL" name="image" value={formData.image} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;