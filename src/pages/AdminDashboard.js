import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getAllBlogs, deleteBlog } from '../utils/blogStorage';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, blogId: null, blogTitle: '' });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    const loadBlogs = () => {
      const allBlogs = getAllBlogs();
      setBlogs(allBlogs);
    };
    
    loadBlogs();
  }, [isAuthenticated, navigate]);

  const handleDeleteClick = (blog) => {
    setDeleteDialog({
      open: true,
      blogId: blog.id,
      blogTitle: blog.title,
    });
  };

  const handleDeleteConfirm = () => {
    deleteBlog(deleteDialog.blogId);
    setBlogs(blogs.filter(blog => blog.id !== deleteDialog.blogId));
    setDeleteDialog({ open: false, blogId: null, blogTitle: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, blogId: null, blogTitle: '' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isAuthenticated) {
    return null;
  }

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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Mission Control
              </Typography>
              <Typography variant="h6" sx={{ color: '#b3b3b3' }}>
                Manage your cosmic content
              </Typography>
            </Box>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/admin/editor')}
                size="large"
                sx={{
                  py: 1.5,
                  px: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                Create New Post
              </Button>
            </motion.div>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="glass-effect">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#00d4ff', fontWeight: 700 }}>
                    {blogs.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                    Total Posts
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="glass-effect">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#ff6b35', fontWeight: 700 }}>
                    {blogs.reduce((acc, blog) => acc + blog.tags.length, 0)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                    Total Tags
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="glass-effect">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#8a2be2', fontWeight: 700 }}>
                    {blogs.filter(blog => new Date(blog.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                    This Month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="glass-effect">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#00ff88', fontWeight: 700 }}>
                    {Math.round(blogs.reduce((acc, blog) => acc + parseInt(blog.readTime), 0) / blogs.length) || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                    Avg Read Time
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Blog List */}
          <Grid container spacing={3}>
            {blogs.map((blog, index) => (
              <Grid item xs={12} key={blog.id}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="glass-effect hover-lift"
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 10px 30px rgba(0, 212, 255, 0.2)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: '#ffffff',
                              mb: 1,
                            }}
                          >
                            {blog.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#b3b3b3',
                              mb: 2,
                              lineHeight: 1.6,
                            }}
                          >
                            {blog.excerpt}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#666' }}>
                              Published: {formatDate(blog.publishedAt)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666' }}>
                              {blog.readTime}
                            </Typography>
                          </Box>
                          <Box>
                            {blog.tags.slice(0, 4).map((tag) => (
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
                                }}
                              />
                            ))}
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                              onClick={() => navigate(`/blog/${blog.id}`)}
                              sx={{
                                color: '#00d4ff',
                                '&:hover': {
                                  background: 'rgba(0, 212, 255, 0.1)',
                                },
                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                              onClick={() => navigate(`/admin/editor/${blog.id}`)}
                              sx={{
                                color: '#ff6b35',
                                '&:hover': {
                                  background: 'rgba(255, 107, 53, 0.1)',
                                },
                              }}
                            >
                              <Edit />
                            </IconButton>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                              onClick={() => handleDeleteClick(blog)}
                              sx={{
                                color: '#ff4444',
                                '&:hover': {
                                  background: 'rgba(255, 68, 68, 0.1)',
                                },
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </motion.div>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {blogs.length === 0 && (
            <Box textAlign="center" py={8}>
              <Typography variant="h5" sx={{ color: '#b3b3b3', mb: 2 }}>
                No cosmic content yet
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
                Start your journey by creating your first blog post
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/admin/editor')}
                size="large"
              >
                Create Your First Post
              </Button>
            </Box>
          )}
        </motion.div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          PaperProps={{
            sx: {
              background: 'rgba(26, 26, 46, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <DialogTitle sx={{ color: '#ffffff' }}>
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: '#b3b3b3' }}>
              Are you sure you want to delete "{deleteDialog.blogTitle}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} sx={{ color: '#b3b3b3' }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              sx={{
                background: '#ff4444',
                '&:hover': {
                  background: '#ff6666',
                },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default AdminDashboard;