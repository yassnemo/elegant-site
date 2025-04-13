
import { useEffect } from 'react';
import { useRoute } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { books } from '@/data';

const BookReviewPage = () => {
  const [, params] = useRoute('/bookshelf/:slug');
  const book = books.find(b => b.title.toLowerCase().replace(/\s+/g, '-') === params?.slug);

  useEffect(() => {
    if (book) {
      document.title = `${book.title} Review | Yassine Erradouani`;
    }
    window.scrollTo(0, 0);
  }, [book]);

  if (!book) {
    return <div className="pt-24 text-center">Book not found</div>;
  }

  return (
    <div className="pt-0">
      <AnimatedSection className="py-3 sm:py-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              eyebrow="Book Review"
              title={book.title}
              description={`By ${book.author}`}
            />
            
            <div className="flex flex-col md:flex-row gap-12 mt-8">
              <div className="w-full md:w-1/3">
                <div className="relative md:sticky md:top-24 w-full max-w-[240px] mx-auto">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30 group-hover:opacity-50 transition"></div>
                    <img 
                      src={book.coverImage} 
                      alt={`${book.title} cover`} 
                      className="relative w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </div>
                  <div className="flex items-center justify-center mt-6 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`${
                          i < book.rating 
                            ? 'ri-star-fill' 
                            : i + 0.5 === book.rating 
                            ? 'ri-star-half-fill' 
                            : 'ri-star-line'
                        } text-yellow-400 text-xl transition-transform hover:scale-110`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <blockquote className="text-xl italic text-muted-foreground mb-8 relative">
                  <i className="ri-double-quotes-l absolute -left-6 -top-4 text-primary/20 text-4xl"></i>
                  {book.quote}
                  <i className="ri-double-quotes-r absolute -right-6 -bottom-4 text-primary/20 text-4xl"></i>
                </blockquote>
                
                <div className="prose prose-lg prose-zinc dark:prose-invert">
                  <h2 className="text-2xl font-serif mb-4">Summary</h2>
                  <p className="text-muted-foreground leading-relaxed">{book.review?.summary}</p>
                  
                  <h2 className="text-2xl font-serif mt-8 mb-4">Key Takeaways</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    {book.review?.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <i className="ri-arrow-right-line text-primary mt-1"></i>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="text-2xl font-serif mt-8 mb-4">Favorite Quotes</h2>
                  <div className="space-y-4">
                    {book.review?.favoriteQuotes.map((quote, index) => (
                      <blockquote key={index} className="border-l-4 border-primary/30 pl-4 italic">
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>

                  <h2 className="text-2xl font-serif mt-8 mb-4">Personal Impact</h2>
                  <p className="text-muted-foreground leading-relaxed">{book.review?.personalImpact}</p>

                  <h2 className="text-2xl font-serif mt-8 mb-4">Who Should Read This?</h2>
                  <p className="text-muted-foreground leading-relaxed">{book.review?.recommendations}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BookReviewPage;
