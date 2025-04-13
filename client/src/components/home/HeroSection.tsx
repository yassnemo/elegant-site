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
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center pt-32 pb-16 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 md:pl-12 md:pr-10">
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
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                  alt="Yassine Erradouani" 
                  className="object-cover h-[380px] w-full rounded-lg"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
