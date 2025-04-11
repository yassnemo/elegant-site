import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { blogPosts } from '@/data';

const BlogSection = () => {
  return (
    <AnimatedSection id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Insights"
          title="Latest Articles"
          description="Thoughts on data science, psychology, AI ethics, and more."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow project-card section-transition"
            >
              <div className="p-6">
                <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                <h3 className="text-xl font-bold mb-3 mt-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex gap-2 mb-4">
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
          
          {blogPosts.length > 3 && (
            <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-3 mt-8">
              <Link href="/blog">
                <Button variant="outline" className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
                  View All Articles <i className="ri-arrow-right-line"></i>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BlogSection;
