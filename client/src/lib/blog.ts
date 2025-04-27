import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import readingTime from 'reading-time';

// Types for blog posts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: string;
}

const blogDirectory = path.join(process.cwd(), 'client', 'src', 'content', 'blog');

/**
 * Converts markdown content to HTML
 */
export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdown);
  return result.toString();
}

/**
 * Gets all blog posts with their metadata and content
 */
export function getAllPosts(): BlogPost[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(blogDirectory)) {
      console.warn('Blog directory does not exist:', blogDirectory);
      return [];
    }

    // Get all markdown files from the blog directory
    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((fileName) => /\.md$/.test(fileName))
      .map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);
        
        // Calculate reading time
        const readingTimeResult = readingTime(content);

        // Validate required fields
        if (!data.title || !data.date || !data.excerpt) {
          console.warn(`Missing required fields in ${fileName}`);
        }

        // Format tags array
        const tags = data.tags || [];

        // Combine the data
        return {
          slug,
          title: data.title || 'Untitled Post',
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          excerpt: data.excerpt || '',
          content,
          tags: Array.isArray(tags) ? tags : [tags],
          readingTime: readingTimeResult.text,
        };
      })
      // Sort posts by date in descending order
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

    return allPostsData;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
}

/**
 * Gets a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Calculate reading time
    const readingTimeResult = readingTime(content);
    
    // Format tags array
    const tags = data.tags || [];
    
    return {
      slug,
      title: data.title || 'Untitled Post',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      excerpt: data.excerpt || '',
      content,
      tags: Array.isArray(tags) ? tags : [tags],
      readingTime: readingTimeResult.text,
    };
  } catch (error) {
    console.error(`Error getting post by slug "${slug}":`, error);
    return null;
  }
}