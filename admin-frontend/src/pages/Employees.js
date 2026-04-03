import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, IconButton, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    username: '', email: '', mobile: '', password: '', role: 'employee'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // Assuming backend has GET /api/users or similar
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`);
      setEmployees(response.data.users.filter(user => user.role === 'employee'));
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleOpen = (employee = null) => {
    if (employee) {
      setEditing(employee);
      setFormData({ ...employee, password: '' }); // Don't show password
    } else {
      setEditing(null);
      setFormData({ username: '', email: '', mobile: '', password: '', role: 'employee' });
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
        // Update employee
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/users/${editing._id}`, formData);
      } else {
        // Add new employee via signup or separate endpoint
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, formData);
      }
      fetchEmployees();
      handleClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/users/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Employees
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
        Add Employee
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(employee)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Username" name="username" value={formData.username} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
          {!editing && (
            <TextField fullWidth margin="dense" label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          )}
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select name="role" value={formData.role} onChange={handleChange}>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Employees;