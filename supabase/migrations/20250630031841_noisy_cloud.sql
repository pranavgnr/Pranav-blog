/*
  # Create blogs table for Pranav's cosmic blog

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required) 
      - `excerpt` (text, optional)
      - `author` (text, default 'Pranav Nag B')
      - `published_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)
      - `tags` (text array)
      - `read_time` (text)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `blogs` table
    - Add policy for public read access
    - Add policy for authenticated users to manage blogs

  3. Sample Data
    - Insert initial blog posts to get started
*/

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author text DEFAULT 'Pranav Nag B',
  published_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  tags text[] DEFAULT '{}',
  read_time text DEFAULT '1 min read',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blogs
CREATE POLICY "Anyone can read blogs"
  ON blogs
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert blogs
CREATE POLICY "Authenticated users can insert blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update blogs
CREATE POLICY "Authenticated users can update blogs"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete blogs
CREATE POLICY "Authenticated users can delete blogs"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample blog posts
INSERT INTO blogs (title, content, excerpt, tags, read_time, published_at) VALUES
(
  'Welcome to My Space Blog',
  '# Welcome to My Space Blog

Welcome to my corner of the digital universe! This is where I share my thoughts on technology, innovation, and the endless possibilities that lie ahead.

## What You''ll Find Here

- **Tech Insights**: Deep dives into emerging technologies
- **Innovation Stories**: Tales from the cutting edge of development
- **Creative Thinking**: Exploring new ways to solve old problems
- **Personal Journey**: My experiences in the tech world

## The Journey Ahead

This blog is more than just a collection of posts—it''s a journey through the cosmos of ideas. Each article is a star in the constellation of knowledge we''re building together.

Stay tuned for more cosmic content!',
  'Exploring the cosmos of technology, innovation, and creative thinking...',
  ARRAY['welcome', 'introduction', 'tech'],
  '3 min read',
  '2024-01-15T00:00:00Z'
),
(
  'The Future of Web Development',
  '# The Future of Web Development

The web development landscape is evolving at an unprecedented pace. Let''s explore what the future holds.

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

The future is bright, and it''s arriving faster than we think!',
  'Diving deep into the technologies that will shape the next decade of web development...',
  ARRAY['web-development', 'future', 'technology'],
  '7 min read',
  '2024-01-20T00:00:00Z'
),
(
  'Building Scalable React Applications',
  '# Building Scalable React Applications

Creating React applications that can scale is both an art and a science. Here''s what I''ve learned from building large-scale applications.

## Architecture Patterns

### Component Composition
Instead of building monolithic components, focus on composition. Small, focused components are easier to test, maintain, and reuse.

### State Management
Choose your state management solution wisely:
- **Local State**: For component-specific data
- **Context API**: For app-wide state that doesn''t change frequently
- **Redux/Zustand**: For complex state with frequent updates

### Code Organization
Structure your code for scalability:
```
src/
  components/
    common/
    features/
  hooks/
  services/
  utils/
  pages/
```

## Performance Optimization

### Code Splitting
Use React.lazy() and Suspense to split your code and load only what''s needed.

### Memoization
Leverage React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

### Bundle Analysis
Regularly analyze your bundle size and optimize accordingly.

## Testing Strategy

A scalable application needs a robust testing strategy:
- **Unit Tests**: For individual components and functions
- **Integration Tests**: For component interactions
- **E2E Tests**: For critical user journeys

Remember: scalability isn''t just about handling more users—it''s about maintaining code quality as your team and codebase grow.',
  'Best practices and patterns for creating React applications that can grow with your business...',
  ARRAY['react', 'scalability', 'architecture'],
  '10 min read',
  '2024-01-25T00:00:00Z'
);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();