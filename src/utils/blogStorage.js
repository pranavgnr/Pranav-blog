import { supabase } from './supabase';

// Get all blogs from Supabase
export const getAllBlogs = async () => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    return [];
  }
};

// Get a single blog by ID
export const getBlogById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getBlogById:', error);
    return null;
  }
};

// Save a blog (create or update)
export const saveBlog = async (blog) => {
  try {
    const blogData = {
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || generateExcerpt(blog.content),
      tags: blog.tags || [],
      read_time: blog.readTime || calculateReadTime(blog.content),
      author: blog.author || 'Pranav Nag B',
    };

    let result;

    if (blog.id) {
      // Update existing blog
      const { data, error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', blog.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new blog
      const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return result;
  } catch (error) {
    console.error('Error saving blog:', error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (id) => {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

// Generate excerpt from content
export const generateExcerpt = (content, maxLength = 150) => {
  const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ');
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
};

// Calculate read time
export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};