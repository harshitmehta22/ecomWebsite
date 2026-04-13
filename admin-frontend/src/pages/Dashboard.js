import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`);
      const allUsers = response.data.users || [];
      setUsers(allUsers);

      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const newUsers = allUsers.filter((user) => new Date(user.createdAt) >= weekAgo);
      const notifItems = newUsers.slice(0, 5).map((user) => ({
        id: user._id,
        text: `New registration: ${user.username || user.email}`,
        time: new Date(user.createdAt).toLocaleString(),
      }));
      setNotifications(notifItems);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
    setNotifications([]); // Clear notifications when menu is closed
  };

  const newRegistrations = users.filter((user) => {
    if (!user.createdAt) return false;
    const created = new Date(user.createdAt);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return created >= weekAgo;
  });

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleOpenNotifications}
            aria-controls={anchorEl ? 'notification-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="notification-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseNotifications}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {notifications.length === 0 ? (
              <MenuItem disabled>
                <ListItemText primary="No new notifications" />
              </MenuItem>
            ) : (
              notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleCloseNotifications}>
                  <ListItemText primary={notification.text} secondary={notification.time} />
                </MenuItem>
              ))
            )}
          </Menu>
          <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
          <Button color="inherit" onClick={() => navigate('/employees')}>Employees</Button>
          <Button color="inherit" onClick={() => navigate('/users')}>Users</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Admin Panel
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Manage Products</Typography>
                <Typography>Add, edit, or delete products.</Typography>
                <Button variant="contained" sx={{ mt: 1 }} onClick={() => navigate('/products')}>
                  Go to Products
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Manage Employees</Typography>
                <Typography>Handle employee accounts.</Typography>
                <Button variant="contained" sx={{ mt: 1 }} onClick={() => navigate('/employees')}>
                  Go to Employees
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">View All Users</Typography>
                <Typography>Show all registered users.</Typography>
                <Button variant="contained" sx={{ mt: 1 }} onClick={() => navigate('/users')}>
                  Go to Users
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">New Registrations</Typography>
                <Typography sx={{ mb: 1 }}>
                  {newRegistrations.length} user(s) registered in last 7 days.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {newRegistrations.slice(0, 3).map((user) => `${user.username || user.email}`).join(', ') || 'No recent registrations'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;