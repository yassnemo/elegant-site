import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { books } from '@/data';

const BookshelfSection = () => {
  return (
    <AnimatedSection id="bookshelf" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Reading List"
          title="Books I Recommend"
          description="A collection of books that have shaped my thinking and approach to data science, AI, and life."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.slice(0, 4).map((book, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-[#112240] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow section-transition"
            >
              <div className="p-4 flex flex-col items-center">
                <div className="w-40 h-56 mb-4 overflow-hidden rounded shadow-sm">
                  <img 
                    src={book.coverImage} 
                    alt={`${book.title} cover`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-center dark:text-gray-200">{book.title}</h3>
                <p className="text-gray-600 dark:text-[#8892B0] text-sm text-center mb-2">{book.author}</p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      className={`${i < book.rating ? 'ri-star-fill' : i + 0.5 === book.rating ? 'ri-star-half-fill' : 'ri-star-line'} text-yellow-400`}
                    ></i>
                  ))}
                </div>
                <p className="text-gray-500 dark:text-[#8892B0] text-xs text-center italic">"{book.quote}"</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center mt-12">
          <Link href="/bookshelf">
            <Button variant="outline" className="border border-primary dark:border-[#64FFDA] text-primary dark:text-[#64FFDA] hover:bg-primary dark:hover:bg-[#64FFDA] hover:text-white dark:hover:text-[#0A192F] px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              View Full Reading List <i className="ri-arrow-right-line"></i>
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BookshelfSection;
