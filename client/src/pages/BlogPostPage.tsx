import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { setupIntersectionObserver } from '@/lib/utils';
import { blogPosts } from '@/data';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

const BlogPostPage = () => {
  const [, params] = useRoute('/blog/:slug');
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    if (params?.slug) {
      const foundPost = blogPosts.find(p => p.slug === params.slug);
      if (foundPost) {
        setPost(foundPost);
        document.title = `${foundPost.title} | Yassine Erradouani's Blog`;
      }
    }
  }, [params]);

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

  const renderMarkdown = (content: string) => {
    // Very simple markdown parser for headings, paragraphs, and lists
    const lines = content.split('\n').map(line => line.trim()).filter(line => line);
    
    return lines.map((line, index) => {
      // Handle headings
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{line.slice(4)}</h3>;
      }
      
      // Handle lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-6 mb-2 list-disc">
            {line.slice(2)}
          </li>
        );
      }
      
      // Default to paragraph
      return <p key={index} className="mb-4 text-gray-600 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="pt-20">
      <AnimatedSection className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Post Header */}
            <div className="mb-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="mx-2">•</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              <p className="text-xl text-gray-600">{post.excerpt}</p>
            </div>
            
            {/* Post Content */}
            <div className="prose max-w-none">
              {renderMarkdown(post.content)}
            </div>
            
            {/* Footer Navigation */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <Link href="/blog" className="flex items-center text-primary hover:underline mb-4 sm:mb-0">
                  <i className="ri-arrow-left-line mr-2"></i>
                  Back to all posts
                </Link>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-4">Share:</span>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                      <i className="ri-twitter-fill text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                      <i className="ri-linkedin-fill text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary transition-colors">
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