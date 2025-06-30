import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import { AdminPanelSettings, Home } from "@mui/icons-material";
import { motion } from "framer-motion";
import PranavLogo from "../assets/Pranav-logo.jpeg";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Toolbar sx={{ padding: '0 2rem' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <Box
            component="img"
            src={PranavLogo}
            alt="Pranav Logo"
            sx={{
              width: 45,
              height: 45,
              borderRadius: '50%',
              marginRight: 2,
              border: '2px solid rgba(0, 212, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '2px solid #00d4ff',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
              }
            }}
          />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00d4ff, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
            }}
          >
            Pranav Nag B
          </Typography>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {location.pathname !== '/' && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={() => navigate('/')}
                sx={{
                  color: '#00d4ff',
                  '&:hover': {
                    background: 'rgba(0, 212, 255, 0.1)',
                  }
                }}
              >
                <Home />
              </IconButton>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              onClick={handleAdminClick}
              sx={{
                color: isAuthenticated ? '#ff6b35' : '#00d4ff',
                '&:hover': {
                  background: isAuthenticated ? 'rgba(255, 107, 53, 0.1)' : 'rgba(0, 212, 255, 0.1)',
                }
              }}
            >
              <AdminPanelSettings />
            </IconButton>
          </motion.div>

          {isAuthenticated && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleLogout}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: '#ff6b35',
                  color: '#ff6b35',
                  '&:hover': {
                    borderColor: '#ff9568',
                    background: 'rgba(255, 107, 53, 0.1)',
                  }
                }}
              >
                Logout
              </Button>
            </motion.div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;