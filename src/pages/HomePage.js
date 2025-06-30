import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, InputBase, IconButton, Divider, CircularProgress } from '@mui/material';
import { Search, AccessTime, Person, CalendarToday } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getAllBlogs } from '../utils/blogStorage';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const allBlogs = await getAllBlogs();
        setBlogs(allBlogs);
        setFilteredBlogs(allBlogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
          <CircularProgress sx={{ color: '#00d4ff' }} size={60} />
        </motion.div>
      </Box>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Stars Background */}
      <div className="stars">
        {[...Array(50)].map((_, i) => (
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

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                background: 'linear-gradient(45deg, #00d4ff, #ff6b35, #8a2be2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite',
              }}
            >
              Cosmic Thoughts
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#b3b3b3',
                fontWeight: 300,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Exploring the universe of technology, innovation, and creative thinking
            </Typography>
          </Box>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6,
            }}
          >
            <Box
              className="glass-effect"
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '600px',
                p: 1,
                '&:hover': {
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <IconButton sx={{ color: '#00d4ff' }}>
                <Search />
              </IconButton>
              <InputBase
                placeholder="Search the cosmos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  flex: 1,
                  color: 'white',
                  '& .MuiInputBase-input::placeholder': {
                    color: '#b3b3b3',
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </Box>
        </motion.div>

        {/* Blog List */}
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                onClick={() => handleBlogClick(blog.id)}
                sx={{
                  py: 4,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    '& .blog-title': {
                      color: '#00d4ff',
                    },
                    '& .blog-excerpt': {
                      color: '#ffffff',
                    },
                  },
                }}
              >
                <Typography
                  className="blog-title"
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {blog.title}
                </Typography>
                
                <Typography
                  className="blog-excerpt"
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: '#b3b3b3',
                    lineHeight: 1.7,
                    fontSize: '1.1rem',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {blog.excerpt}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    color: '#666',
                    fontSize: '0.9rem',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: 'inherit' }}>
                      {blog.author}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: 'inherit' }}>
                      {formatDate(blog.published_at)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: 'inherit' }}>
                      {blog.read_time}
                    </Typography>
                  </Box>

                  <Box sx={{ ml: 'auto' }}>
                    {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Typography
                        key={tag}
                        variant="caption"
                        sx={{
                          color: '#00d4ff',
                          opacity: 0.7,
                          mr: tagIndex < blog.tags.slice(0, 2).length - 1 ? 1 : 0,
                        }}
                      >
                        #{tag}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
              
              {index < filteredBlogs.length - 1 && (
                <Divider 
                  sx={{ 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    my: 0,
                  }} 
                />
              )}
            </motion.div>
          ))}
        </Box>

        {filteredBlogs.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box textAlign="center" py={8}>
              <Typography variant="h4" sx={{ color: '#b3b3b3', mb: 2 }}>
                No cosmic thoughts found
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Try adjusting your search terms to explore different galaxies of content
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;