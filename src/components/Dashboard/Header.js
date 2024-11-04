import React from 'react';
import Logout from '../Logout';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Management Software
        </Typography>

        <Button
          color="inherit"
          onClick={() => setIsAdding(true)}
        >
          Add Employee
        </Button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;