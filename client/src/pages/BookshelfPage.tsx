import { useEffect } from 'react';
import { useLocation } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { setupIntersectionObserver } from '@/lib/utils';
import { books } from '@/data';

const BookshelfPage = () => {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Set page title
    document.title = 'Bookshelf | Yassine Erradouani';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleBookClick = (bookTitle: string) => {
    const slug = bookTitle.toLowerCase().replace(/\s+/g, '-');
    setLocation(`/bookshelf/${slug}`);
  };

  return (
    <div className="pt-20">
      <AnimatedSection className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow="Reading List"
            title="My Complete Bookshelf"
            description="Books that have shaped my thinking and approach to data science, AI, and life."
          />
          
          <ul className="flex flex-wrap justify-center gap-8 mt-8">
            {books.map((book, index) => (
              <li 
                key={index} 
                className="book section-transition" 
                onClick={() => handleBookClick(book.title)}
                role="button"
                aria-label={`View review of ${book.title}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleBookClick(book.title);
                  }
                }}
              >
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>by {book.author}</p>
                  <span className="rating">
                    {book.rating === 5 ? "Top Pick" : `${book.rating}/5 Stars`}
                  </span>
                </div>
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} cover`} 
                />
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BookshelfPage;
