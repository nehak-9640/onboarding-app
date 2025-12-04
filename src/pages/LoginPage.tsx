import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VALID = { username: 'user123', password: 'password123' };

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === VALID.username && password === VALID.password) {
      navigate('/onboarding');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <Box component="form" onSubmit={submit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
