import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { formatDate, setupIntersectionObserver } from '@/lib/utils';
import { blogPosts } from '@/data';

const BlogPage = () => {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  useEffect(() => {
    // Set page title
    document.title = 'Blog | Yassine Erradouani';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  // Extract all unique tags from blog posts
  const allTags = ['All', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];
  
  // Filter posts based on active tag
  useEffect(() => {
    if (activeTag === 'All') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.tags.includes(activeTag)));
    }
  }, [activeTag]);

  return (
    <div className="pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">The Blog</h1>
            <p className="text-lg text-gray-600">
              I write about data science, artificial intelligence, psychology, and other topics I find interesting.
              These articles reflect my thoughts, experiences, and learnings along my journey.
            </p>
          </div>
          
          {/* Tags filter */}
          <div className="mb-10 overflow-x-auto pb-2 max-w-3xl mx-auto">
            <div className="flex space-x-3">
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTag(tag)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTag === tag 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Blog posts */}
          <div className="max-w-3xl mx-auto space-y-10">
            {filteredPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <article className="group cursor-pointer section-transition">
                  <div className="mb-3">
                    <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="bg-primary bg-opacity-10 text-primary text-xs px-3 py-1 rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveTag(tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Read More <i className="ri-arrow-right-line ml-1"></i>
                  </div>
                </article>
                
                {/* Divider */}
                {index < filteredPosts.length - 1 && (
                  <div className="border-b border-gray-100 my-10"></div>
                )}
              </Link>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No articles found with this tag.</p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default BlogPage;
