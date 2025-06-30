import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BlogEditor from './pages/BlogEditor';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00d4ff',
        light: '#4de6ff',
        dark: '#0099cc',
      },
      secondary: {
        main: '#ff6b35',
        light: '#ff9568',
        dark: '#cc4a1a',
      },
      background: {
        default: '#0a0a0f',
        paper: '#1a1a2e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
        background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.5rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '2rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '12px 24px',
            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
            '&:hover': {
              background: 'linear-gradient(45deg, #4de6ff, #00d4ff)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)',
            },
            transition: 'all 0.3s ease',
          },
        },
      },
    },
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/editor" element={<BlogEditor />} />
              <Route path="/admin/editor/:id" element={<BlogEditor />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;