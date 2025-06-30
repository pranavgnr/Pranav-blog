import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin@pranav.blog / admin123');
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Stars Background */}
      <div className="stars">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            className="glass-effect"
            sx={{
              p: 4,
              textAlign: 'center',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <AdminPanelSettings
                sx={{
                  fontSize: 60,
                  color: '#00d4ff',
                  mb: 2,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Admin Portal
              </Typography>
              <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                Access the cosmic control center
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, background: 'rgba(255, 107, 53, 0.1)' }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00d4ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00d4ff',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b3b3b3',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00d4ff',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00d4ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00d4ff',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b3b3b3',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00d4ff',
                  },
                }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}
                >
                  Enter the Cosmos
                </Button>
              </motion.div>
            </Box>

            <Box sx={{ mt: 3, p: 2, background: 'rgba(0, 212, 255, 0.05)', borderRadius: 2 }}>
              <Typography variant="caption" sx={{ color: '#b3b3b3' }}>
                Demo Credentials:<br />
                Email: admin@pranav.blog<br />
                Password: admin123
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
};

export default AdminLogin;