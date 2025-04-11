import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Handle image hover effect
  useEffect(() => {
    if (!imageWrapperRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageWrapperRef.current) return;
      
      const rect = imageWrapperRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalize coordinates
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Apply rotation (subtly)
      gsap.to(imageWrapperRef.current, {
        rotationY: (xPercent - 0.5) * 5, // -2.5 to 2.5 degrees
        rotationX: (0.5 - yPercent) * 5, // -2.5 to 2.5 degrees
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(imageWrapperRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    };
    
    imageWrapperRef.current.addEventListener('mousemove', handleMouseMove);
    imageWrapperRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (imageWrapperRef.current) {
        imageWrapperRef.current.removeEventListener('mousemove', handleMouseMove);
        imageWrapperRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  // Animation sequence
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(headingRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
    .fromTo(textRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.4"
    )
    .fromTo(tagsRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.4"
    )
    .fromTo(buttonsRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.4"
    )
    .fromTo(imageRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1 }, 
      "-=0.6"
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <section id="home" ref={sectionRef} className="min-h-[85vh] flex items-center pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 md:pr-10">
            <p className="text-primary font-medium mb-3 text-lg">Hello there, I'm</p>
            <h1 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Yassine Erradouani</h1>
            <p ref={textRef} className="text-lg md:text-xl text-gray-600 mb-6">
              A Data Science & Machine Learning student passionate about using <span className="text-primary font-medium">AI for real-world impact</span>.
            </p>
            
            <div ref={tagsRef} className="flex flex-wrap gap-2 mb-6">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Data Science</span>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Machine Learning</span>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">AI Enthusiast</span>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Chess Analyzer</span>
            </div>
            
            <div ref={buttonsRef} className="flex gap-3">
              <Button 
                className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2 text-sm"
                onClick={() => scrollToSection('projects')}
              >
                View Projects <i className="ri-arrow-right-line"></i>
              </Button>
              <Button 
                variant="outline" 
                className="border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2 rounded-full font-medium transition-all text-sm"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </Button>
            </div>
          </div>
          
          <div ref={imageRef} className="md:w-2/5 mt-10 md:mt-0">
            {/* Brittany Chiang style image with gradient border effect */}
            <div 
              ref={imageWrapperRef}
              className="max-w-sm mx-auto md:mx-0 relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-primary/50 opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-gray-900 p-1 rounded-lg">
                {/* Color Overlay */}
                <div 
                  className={`absolute inset-0 rounded-lg bg-primary opacity-20 mix-blend-multiply z-20 transition-opacity duration-300 ${isImageLoaded ? 'opacity-20' : 'opacity-0'}`}
                ></div>
                
                {/* Image with grainy texture */}
                <div className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiPjwvcmVjdD4KPC9zdmc+')] opacity-20 z-10"></div>
                  
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                    alt="Yassine Erradouani" 
                    className="relative z-0 object-cover h-[380px] w-full grayscale brightness-75 contrast-125 rounded-lg transition-all duration-300"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
