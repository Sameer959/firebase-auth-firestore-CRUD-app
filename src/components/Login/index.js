import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {Container, TextField, Button, Typography, Box} from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAsync, registerAsync } from '../../components/Login/authSlice'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  
  const dispatch = useDispatch(); 

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAsync({ email, password }))
      .unwrap()
      .then(() => navigate('/dashboard'))
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error,
          showConfirmButton: true,
        });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerAsync({ email, password }))
      .unwrap()
      .then(() => navigate('/dashboard'))
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error,
          showConfirmButton: true,
        });
      });
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login & Registration
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="email"
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" name="Login" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outlined" color="secondary" type="submit" name="Register" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;