import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Chip, IconButton, Fab } from '@mui/material';
import { ArrowBack, AccessTime, Person, CalendarToday } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { getBlogById } from '../utils/blogStorage';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = () => {
      const blogData = getBlogById(id);
      setBlog(blogData);
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: '80px',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              border: '3px solid rgba(0, 212, 255, 0.3)',
              borderTop: '3px solid #00d4ff',
              borderRadius: '50%',
            }}
          />
        </motion.div>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ paddingTop: '120px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#b3b3b3', mb: 2 }}>
          Blog post not found
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
          The cosmic content you're looking for seems to have drifted into another dimension.
        </Typography>
        <Fab
          variant="extended"
          onClick={() => navigate('/')}
          sx={{
            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
            '&:hover': {
              background: 'linear-gradient(45deg, #4de6ff, #00d4ff)',
            },
          }}
        >
          <ArrowBack sx={{ mr: 1 }} />
          Back to Home
        </Fab>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Stars Background */}
      <div className="stars">
        {[...Array(30)].map((_, i) => (
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

      {/* Back Button */}
      <Box
        sx={{
          position: 'fixed',
          top: 100,
          left: 20,
          zIndex: 1000,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              background: 'rgba(26, 26, 46, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              color: '#00d4ff',
              '&:hover': {
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid #00d4ff',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
              },
            }}
          >
            <ArrowBack />
          </IconButton>
        </motion.div>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 800,
                background: 'linear-gradient(45deg, #00d4ff, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              {blog.title}
            </Typography>

            {/* Meta Information */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 3,
                mb: 3,
                pb: 3,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#b3b3b3' }}>
                <Person sx={{ fontSize: 18, mr: 1 }} />
                <Typography variant="body2">{blog.author}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#b3b3b3' }}>
                <CalendarToday sx={{ fontSize: 18, mr: 1 }} />
                <Typography variant="body2">{formatDate(blog.publishedAt)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#b3b3b3' }}>
                <AccessTime sx={{ fontSize: 18, mr: 1 }} />
                <Typography variant="body2">{blog.readTime}</Typography>
              </Box>
            </Box>

            {/* Tags */}
            <Box sx={{ mb: 4 }}>
              {blog.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{
                    mr: 1,
                    mb: 1,
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: '#00d4ff',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    '&:hover': {
                      background: 'rgba(0, 212, 255, 0.2)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Content */}
          <Box
            className="glass-effect"
            sx={{
              p: 4,
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: '#ffffff',
                fontWeight: 600,
                mb: 2,
                mt: 3,
              },
              '& h1': {
                fontSize: '2.5rem',
                background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              },
              '& h2': {
                fontSize: '2rem',
                color: '#00d4ff',
              },
              '& h3': {
                fontSize: '1.5rem',
                color: '#4de6ff',
              },
              '& p': {
                color: '#e0e0e0',
                lineHeight: 1.8,
                mb: 2,
                fontSize: '1.1rem',
              },
              '& ul, & ol': {
                color: '#e0e0e0',
                mb: 2,
                pl: 3,
              },
              '& li': {
                mb: 1,
                lineHeight: 1.6,
              },
              '& code': {
                background: 'rgba(0, 212, 255, 0.1)',
                color: '#00d4ff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.9em',
              },
              '& pre': {
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '8px',
                p: 2,
                overflow: 'auto',
                mb: 2,
              },
              '& pre code': {
                background: 'none',
                color: '#e0e0e0',
                padding: 0,
              },
              '& blockquote': {
                borderLeft: '4px solid #00d4ff',
                pl: 2,
                ml: 0,
                fontStyle: 'italic',
                color: '#b3b3b3',
                background: 'rgba(0, 212, 255, 0.05)',
                py: 1,
                borderRadius: '0 4px 4px 0',
              },
              '& strong': {
                color: '#ffffff',
                fontWeight: 600,
              },
              '& a': {
                color: '#00d4ff',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
};

export default BlogPost;