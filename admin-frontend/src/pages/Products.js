import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, IconButton, FormControlLabel, Checkbox, FormGroup
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '', brand: '', description: '', price: '', color: '', size: [], image: null, stock: ''
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
      setFormData({ ...product, size: product.size || [], image: null });
    } else {
      setEditing(null);
      setFormData({ title: '', brand: '', description: '', price: '', color: '', size: [], image: null, stock: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({ ...formData, size: [...formData.size, value] });
      } else {
        setFormData({ ...formData, size: formData.size.filter(s => s !== value) });
      }
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'size') {
          data.append(key, JSON.stringify(formData[key]));
        } else if (key === 'image' && formData[key]) {
          data.append(key, formData[key]);
        } else if (key !== 'image') {
          data.append(key, formData[key]);
        }
      });

      if (editing) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/products/${editing._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/addproduct`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
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
              <TableCell>Size</TableCell>
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
                <TableCell>{product.size.join(', ')}</TableCell>
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
          <Typography variant="subtitle1">Sizes</Typography>
          <FormGroup row>
            {['5', '6', '7', '8', '9'].map(size => (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    checked={formData.size.includes(size)}
                    onChange={handleChange}
                    value={size}
                    name="size"
                  />
                }
                label={size}
              />
            ))}
          </FormGroup>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-file"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <label htmlFor="image-file">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {formData.image && <Typography>{formData.image.name}</Typography>}
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