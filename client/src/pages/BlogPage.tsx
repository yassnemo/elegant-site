import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { formatDate, setupIntersectionObserver } from '@/lib/utils';
import { blogPosts, blogPostsFallback } from '@/data';

// Define type for blog post
interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
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
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">The Blog</h1>
            <p className="text-lg" style={{ color: "#8892B0" }}>
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
                      ? 'bg-[#64FFDA] text-[#0A192F]' 
                      : 'bg-opacity-10 bg-gray-500 text-gray-300 hover:bg-opacity-20'
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
                    <span className="text-sm" style={{ color: "#8892B0" }}>{formatDate(post.date)}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-[#64FFDA] transition-colors">
                    {post.title}
                  </h2>
                  <p style={{ color: "#8892B0" }} className="mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="bg-[#64FFDA] text-[#0A192F] text-xs px-3 py-1 rounded-full"
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
                  <div className="text-[#64FFDA] font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Read More <i className="ri-arrow-right-line ml-1"></i>
                  </div>
                </article>
                
                {/* Divider */}
                {index < filteredPosts.length - 1 && (
                  <div className="border-b border-[#112240] my-10"></div>
                )}
              </Link>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-10">
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
