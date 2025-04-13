import { useEffect } from 'react';
import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { setupIntersectionObserver } from '@/lib/utils';
import { books } from '@/data';

const BookshelfPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Bookshelf | Yassine Erradouani';
    
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
            eyebrow="Reading List"
            title="My Complete Bookshelf"
            description="Books that have shaped my thinking and approach to data science, AI, and life."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow section-transition"
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="w-40 h-56 mb-4 overflow-hidden rounded shadow-sm">
                    <img 
                      src={book.coverImage} 
                      alt={`${book.title} cover`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center">{book.title}</h3>
                  <p className="text-gray-600 text-sm text-center mb-2">{book.author}</p>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`${i < book.rating ? 'ri-star-fill' : i + 0.5 === book.rating ? 'ri-star-half-fill' : 'ri-star-line'} text-yellow-400`}
                      ></i>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs text-center italic">"{book.quote}"</p>
                  <Link 
                    href={`/bookshelf/${book.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mt-3 text-primary font-medium hover:underline text-sm"
                  >
                    Read My Review
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

export default BookshelfPage;
