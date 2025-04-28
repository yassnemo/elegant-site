import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { setupIntersectionObserver } from '@/lib/utils';
import { blogPosts as rawBlogPosts } from '@/data';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/types/blog';

// Simple browser-compatible markdown renderer
// This avoids importing the server-side markdownToHtml from lib/blog
const renderMarkdown = (markdown: string): string => {
  // This is a very simple implementation - consider using a browser-compatible
  // markdown library like marked.js in production
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Convert line breaks to <br>
    .replace(/\n/gim, '<br>');
};

// Cast imported posts to correct type
const blogPostsTyped = rawBlogPosts as BlogPost[];

// Component to render markdown content
const MarkdownRenderer = ({ content }: { content: string }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Use the browser-compatible rendering function instead
    const html = renderMarkdown(content);
    setHtmlContent(html);
  }, [content]);

  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

const BlogPostPage = () => {
  // Fix: Properly type the params and ensure it's not null
  const [match, params] = useRoute<{ slug: string }>('/blog/:slug');
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Find the post that matches the slug
    if (match && params) {
      const foundPost = blogPostsTyped.find(p => p.slug === params.slug);
      if (foundPost) {
        setPost(foundPost);
        document.title = `${foundPost.title} | Yassine Erradouani's Blog`;
      }
    }
  }, [match, params]);

  if (!post) {
    return (
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-8">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button variant="default">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <AnimatedSection className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Post Header */}
            <div className="mb-8">
              <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="mx-2">•</span>
                <span>{post.readingTime}</span>
                <span className="mx-2">•</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="bg-primary dark:bg-[#64FFDA] text-white dark:text-gray-900 text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{post.excerpt}</p>
            </div>
            
            {/* Post Content */}
            <div className="mt-10">
              <MarkdownRenderer content={post.content} />
            </div>
            
            {/* Footer Navigation */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <Link href="/blog" className="flex items-center text-primary hover:underline mb-4 sm:mb-0">
                  <i className="ri-arrow-left-line mr-2"></i>
                  Back to all posts
                </Link>
                
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 mr-4">Share:</span>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                      <i className="ri-twitter-fill text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                      <i className="ri-linkedin-fill text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                      <i className="ri-facebook-fill text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BlogPostPage;