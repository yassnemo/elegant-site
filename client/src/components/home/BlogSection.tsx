import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { blogPosts } from '@/data';

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
            <div 
              key={index} 
              className="bg-white dark:bg-[#112240] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow project-card section-transition"
            >
              <div className="p-6">
                <span className="text-xs text-gray-500 dark:text-[#8892B0]">{formatDate(post.date)}</span>
                <h3 className="text-xl font-bold mb-3 mt-2 dark:text-gray-200">{post.title}</h3>
                <p className="text-gray-600 dark:text-[#8892B0] mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="bg-primary dark:bg-[#64FFDA] text-white dark:text-[#0A192F] text-xs px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="text-primary dark:text-[#64FFDA] font-medium hover:underline inline-flex items-center">
                  Read More <i className="ri-arrow-right-line ml-1"></i>
                </Link>
              </div>
            </div>
          ))}
          
          {blogPosts.length > 3 && (
            <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-3 mt-8">
              <Link href="/blog">
                <Button variant="outline" className="border border-primary dark:border-[#64FFDA] text-primary dark:text-[#64FFDA] hover:bg-primary dark:hover:bg-[#64FFDA] hover:text-white dark:hover:text-[#0A192F] px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
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
