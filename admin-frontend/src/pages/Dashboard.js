import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
          <Button color="inherit" onClick={() => navigate('/employees')}>Employees</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Admin Panel
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Manage Products</Typography>
                <Typography>Add, edit, or delete products.</Typography>
                <Button variant="contained" onClick={() => navigate('/products')}>Go to Products</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Manage Employees</Typography>
                <Typography>Handle employee accounts.</Typography>
                <Button variant="contained" onClick={() => navigate('/employees')}>Go to Employees</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;