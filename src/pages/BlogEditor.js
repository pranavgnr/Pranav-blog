import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Paper,
  Grid,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Save, Preview, ArrowBack, Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';
import { getBlogById, saveBlog, generateExcerpt, calculateReadTime } from '../utils/blogStorage';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    tags: [],
    excerpt: '',
  });
  const [newTag, setNewTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    if (id) {
      const loadBlog = async () => {
        setLoading(true);
        try {
          const existingBlog = await getBlogById(id);
          if (existingBlog) {
            setBlog({
              ...existingBlog,
              readTime: existingBlog.read_time,
            });
          }
        } catch (error) {
          console.error('Error loading blog:', error);
        } finally {
          setLoading(false);
        }
      };
      loadBlog();
    }
  }, [id, isAuthenticated, navigate]);

  const handleSave = async () => {
    if (!blog.title.trim() || !blog.content.trim()) {
      return;
    }

    setSaving(true);
    
    const blogToSave = {
      ...blog,
      excerpt: blog.excerpt || generateExcerpt(blog.content),
      readTime: calculateReadTime(blog.content),
    };

    try {
      await saveBlog(blogToSave);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !blog.tags.includes(newTag.trim())) {
      setBlog({
        ...blog,
        tags: [...blog.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setBlog({
      ...blog,
      tags: blog.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

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
        {[...Array(20)].map((_, i) => (
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

      <Container maxWidth="xl" sx={{ py: 4 }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={() => navigate('/admin/dashboard')}
                sx={{
                  mr: 2,
                  color: '#00d4ff',
                  '&:hover': {
                    background: 'rgba(0, 212, 255, 0.1)',
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {id ? 'Edit Post' : 'Create New Post'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  startIcon={<Preview />}
                  onClick={() => setPreviewMode(!previewMode)}
                  sx={{
                    borderColor: '#ff6b35',
                    color: '#ff6b35',
                    '&:hover': {
                      borderColor: '#ff9568',
                      background: 'rgba(255, 107, 53, 0.1)',
                    },
                  }}
                >
                  {previewMode ? 'Edit' : 'Preview'}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={saving || !blog.title.trim() || !blog.content.trim()}
                  sx={{
                    px: 3,
                  }}
                >
                  {saving ? 'Saving...' : 'Save Post'}
                </Button>
              </motion.div>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Editor Panel */}
            <Grid item xs={12} lg={previewMode ? 6 : 12}>
              <Paper
                className="glass-effect"
                sx={{ p: 3, height: 'calc(100vh - 200px)', overflow: 'auto' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                  {/* Title */}
                  <TextField
                    fullWidth
                    label="Post Title"
                    value={blog.title}
                    onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                    variant="outlined"
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

                  {/* Excerpt */}
                  <TextField
                    fullWidth
                    label="Excerpt (optional)"
                    value={blog.excerpt}
                    onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
                    multiline
                    rows={2}
                    variant="outlined"
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

                  {/* Tags */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#b3b3b3', mb: 1 }}>
                      Tags
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {blog.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          onDelete={() => handleRemoveTag(tag)}
                          sx={{
                            background: 'rgba(0, 212, 255, 0.1)',
                            color: '#00d4ff',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        size="small"
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        sx={{
                          flex: 1,
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
                        }}
                      />
                      <IconButton
                        onClick={handleAddTag}
                        sx={{
                          color: '#00d4ff',
                          '&:hover': {
                            background: 'rgba(0, 212, 255, 0.1)',
                          },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                  {/* Content Editor */}
                  <TextField
                    fullWidth
                    label="Content (Markdown supported)"
                    value={blog.content}
                    onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                    multiline
                    variant="outlined"
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        height: '100%',
                        alignItems: 'flex-start',
                        '& fieldset': {
                          borderColor: 'rgba(0, 212, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#00d4ff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00d4ff',
                        },
                        '& textarea': {
                          height: '100% !important',
                          overflow: 'auto !important',
                          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                          fontSize: '14px',
                          lineHeight: 1.6,
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
                </Box>
              </Paper>
            </Grid>

            {/* Preview Panel */}
            {previewMode && (
              <Grid item xs={12} lg={6}>
                <Paper
                  className="glass-effect"
                  sx={{
                    p: 3,
                    height: 'calc(100vh - 200px)',
                    overflow: 'auto',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 3,
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #00d4ff, #ffffff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {blog.title || 'Untitled Post'}
                  </Typography>

                  {blog.tags.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      {blog.tags.map((tag) => (
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
                  )}

                  <Box
                    sx={{
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
                    <ReactMarkdown>
                      {blog.content || '*Start writing your cosmic thoughts...*'}
                    </ReactMarkdown>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </motion.div>
      </Container>
    </div>
  );
};

export default BlogEditor;