import { useEffect } from 'react';
import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { formatDate, setupIntersectionObserver } from '@/lib/utils';
import { blogPosts } from '@/data';

const BlogPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Blog | Yassine Erradouani';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <AnimatedSection className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow="Insights"
            title="All Articles"
            description="My thoughts on data science, AI, psychology, and more."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow project-card section-transition"
              >
                <div className="p-6">
                  <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                  <h3 className="text-xl font-bold mb-3 mt-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="bg-primary bg-opacity-10 text-primary text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-primary font-medium hover:underline inline-flex items-center">
                    Read More <i className="ri-arrow-right-line ml-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BlogPage;
