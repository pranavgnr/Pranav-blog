import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Chip, Box, InputBase, IconButton } from '@mui/material';
import { Search, AccessTime, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getAllBlogs } from '../utils/blogStorage';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allBlogs = getAllBlogs();
    setBlogs(allBlogs);
    setFilteredBlogs(allBlogs);
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
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
                width: { xs: '100%', md: '500px' },
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

        {/* Blog Grid */}
        <Grid container spacing={4}>
          {filteredBlogs.map((blog, index) => (
            <Grid item xs={12} md={6} lg={4} key={blog.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className="glass-effect hover-lift"
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)',
                      transform: 'translateY(-8px)',
                    },
                  }}
                  onClick={() => handleBlogClick(blog.id)}
                >
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.3,
                      }}
                    >
                      {blog.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color: '#b3b3b3',
                        lineHeight: 1.6,
                        flex: 1,
                      }}
                    >
                      {blog.excerpt}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
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

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 2,
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', color: '#b3b3b3' }}>
                        <Person sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption">
                          {blog.author}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: '#b3b3b3' }}>
                        <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption">
                          {blog.readTime}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredBlogs.length === 0 && (
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

      <style jsx>{`
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