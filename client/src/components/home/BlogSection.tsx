import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { blogPosts } from '@/data';

// Helper function to format the date in the desired format
const formatCardDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  
  return { day, month, year };
};

const BlogSection = () => {
  return (
    <AnimatedSection id="blog" className="py-20 bg-white dark:bg-background">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Insights"
          title="Latest Articles"
          description="Thoughts on data science, psychology, AI ethics, and more."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
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
        </div>
        
        {blogPosts.length > 3 && (
          <div className="flex items-center justify-center mt-12">
            <Link href="/blog">
              <Button variant="outline" className="border border-primary dark:border-[#64FFDA] text-primary dark:text-[#64FFDA] hover:bg-primary dark:hover:bg-[#64FFDA] hover:text-white dark:hover:text-[#0A192F] px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
                View All Articles <i className="ri-arrow-right-line"></i>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default BlogSection;
