// Blog storage utility using localStorage
const BLOGS_KEY = 'pranav_blogs';

// Initialize with sample data if no blogs exist
const initializeSampleData = () => {
  const sampleBlogs = [
    {
      id: '1',
      title: 'Welcome to My Space Blog',
      excerpt: 'Exploring the cosmos of technology, innovation, and creative thinking...',
      content: `# Welcome to My Space Blog

Welcome to my corner of the digital universe! This is where I share my thoughts on technology, innovation, and the endless possibilities that lie ahead.

## What You'll Find Here

- **Tech Insights**: Deep dives into emerging technologies
- **Innovation Stories**: Tales from the cutting edge of development
- **Creative Thinking**: Exploring new ways to solve old problems
- **Personal Journey**: My experiences in the tech world

## The Journey Ahead

This blog is more than just a collection of posts—it's a journey through the cosmos of ideas. Each article is a star in the constellation of knowledge we're building together.

Stay tuned for more cosmic content!`,
      author: 'Pranav Nag B',
      publishedAt: new Date('2024-01-15').toISOString(),
      tags: ['welcome', 'introduction', 'tech'],
      readTime: '3 min read',
    },
    {
      id: '2',
      title: 'The Future of Web Development',
      excerpt: 'Diving deep into the technologies that will shape the next decade of web development...',
      content: `# The Future of Web Development

The web development landscape is evolving at an unprecedented pace. Let's explore what the future holds.

## Emerging Technologies

### WebAssembly (WASM)
WebAssembly is revolutionizing how we think about web performance. By allowing languages like Rust, C++, and Go to run in the browser at near-native speeds, WASM opens up possibilities we never imagined.

### Edge Computing
The shift towards edge computing is bringing computation closer to users, reducing latency and improving user experience dramatically.

### AI Integration
Artificial Intelligence is becoming deeply integrated into web development workflows, from automated testing to intelligent code completion.

## What This Means for Developers

- **Performance First**: Applications will be faster and more responsive
- **New Skill Sets**: Developers will need to adapt to new paradigms
- **Better User Experience**: Users will expect more from web applications

The future is bright, and it's arriving faster than we think!`,
      author: 'Pranav Nag B',
      publishedAt: new Date('2024-01-20').toISOString(),
      tags: ['web-development', 'future', 'technology'],
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'Building Scalable React Applications',
      excerpt: 'Best practices and patterns for creating React applications that can grow with your business...',
      content: `# Building Scalable React Applications

Creating React applications that can scale is both an art and a science. Here's what I've learned from building large-scale applications.

## Architecture Patterns

### Component Composition
Instead of building monolithic components, focus on composition. Small, focused components are easier to test, maintain, and reuse.

### State Management
Choose your state management solution wisely:
- **Local State**: For component-specific data
- **Context API**: For app-wide state that doesn't change frequently
- **Redux/Zustand**: For complex state with frequent updates

### Code Organization
Structure your code for scalability:
\`\`\`
src/
  components/
    common/
    features/
  hooks/
  services/
  utils/
  pages/
\`\`\`

## Performance Optimization

### Code Splitting
Use React.lazy() and Suspense to split your code and load only what's needed.

### Memoization
Leverage React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

### Bundle Analysis
Regularly analyze your bundle size and optimize accordingly.

## Testing Strategy

A scalable application needs a robust testing strategy:
- **Unit Tests**: For individual components and functions
- **Integration Tests**: For component interactions
- **E2E Tests**: For critical user journeys

Remember: scalability isn't just about handling more users—it's about maintaining code quality as your team and codebase grow.`,
      author: 'Pranav Nag B',
      publishedAt: new Date('2024-01-25').toISOString(),
      tags: ['react', 'scalability', 'architecture'],
      readTime: '10 min read',
    }
  ];

  localStorage.setItem(BLOGS_KEY, JSON.stringify(sampleBlogs));
  return sampleBlogs;
};

export const getAllBlogs = () => {
  const blogs = localStorage.getItem(BLOGS_KEY);
  if (!blogs) {
    return initializeSampleData();
  }
  return JSON.parse(blogs);
};

export const getBlogById = (id) => {
  const blogs = getAllBlogs();
  return blogs.find(blog => blog.id === id);
};

export const saveBlog = (blog) => {
  const blogs = getAllBlogs();
  const existingIndex = blogs.findIndex(b => b.id === blog.id);
  
  if (existingIndex >= 0) {
    blogs[existingIndex] = { ...blog, updatedAt: new Date().toISOString() };
  } else {
    const newBlog = {
      ...blog,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      author: 'Pranav Nag B',
    };
    blogs.unshift(newBlog);
  }
  
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  return blog;
};

export const deleteBlog = (id) => {
  const blogs = getAllBlogs();
  const filteredBlogs = blogs.filter(blog => blog.id !== id);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(filteredBlogs));
};

export const generateExcerpt = (content, maxLength = 150) => {
  const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ');
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
};

export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};