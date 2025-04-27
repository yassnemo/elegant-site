import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { formatDate, setupIntersectionObserver } from '@/lib/utils';
import { blogPosts, blogPostsFallback } from '@/data';

// Helper function to format the date in the desired format
const formatCardDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  
  return { day, month, year };
};

// Define type for blog post
interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
  coverImage?: string;
}

const BlogPage = () => {
  const [activeTag, setActiveTag] = useState<string>('All');
  // Use fallback data if blogPosts is empty and explicitly type with BlogPost interface
  const availablePosts: BlogPost[] = (blogPosts.length > 0 ? blogPosts : blogPostsFallback) as BlogPost[];
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(availablePosts);
  
  useEffect(() => {
    // Set page title
    document.title = 'Blog | Yassine Erradouani';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  // Extract all unique tags from blog posts
  const allTags = ['All', ...Array.from(new Set(availablePosts.flatMap(post => post.tags)))];
  
  // Filter posts based on active tag
  useEffect(() => {
    if (activeTag === 'All') {
      setFilteredPosts(availablePosts);
    } else {
      setFilteredPosts(availablePosts.filter(post => post.tags.includes(activeTag)));
    }
  }, [activeTag, availablePosts]);

  return (
    <div className="pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">The Blog</h1>
            <p className="text-lg" style={{ color: "#8892B0" }}>
              I write about data science, artificial intelligence, psychology, and other topics I find interesting.
              These articles reflect my thoughts, experiences, and learnings along my journey.
            </p>
          </div>
          
          {/* Tags filter - Updated with #6410EA highlight color for light mode only */}
          <div className="mb-10 overflow-x-auto pb-2 max-w-4xl mx-auto">
            <div className="flex space-x-3">
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTag(tag)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTag === tag 
                      ? 'bg-[#6410EA] dark:bg-[#1FE1A5] text-white dark:text-[#111111]' 
                      : 'bg-[#F2F2F2] dark:bg-[#1D293A] text-[#888888] dark:text-[#A6B0C2] hover:bg-opacity-90'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Blog posts grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div key={index} className="blog-card">
                <div className="wrapper" style={{ 
                  backgroundImage: `url(${post.coverImage || 'https://images.unsplash.com/photo-1743527173859-2cf44e80cef8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="date">
                    {/* Using stacked date format to match the image */}
                    <span className="day">{formatCardDate(post.date).day}</span>
                    <span className="month">{formatCardDate(post.date).month}</span>
                    <span className="year">{formatCardDate(post.date).year}</span>
                  </div>
                  
                  <div className="data">
                    <div className="content">
                      <span className="type">{post.tags.join(', ')}</span>
                      <h1 className="title">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h1>
                      <p className="text">{post.excerpt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-10 col-span-full">
                <p style={{ color: "#8892B0" }}>No articles found with this tag.</p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default BlogPage;
