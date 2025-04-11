import { useEffect, useRef } from 'react';
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
              <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">Data Science</span>
              <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">Machine Learning</span>
              <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">AI Enthusiast</span>
              <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">Chess Analyzer</span>
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
            <div className="relative max-w-sm mx-auto md:mx-0">
              <div className="absolute -top-5 -left-5 w-16 h-16 bg-primary bg-opacity-10 rounded-full"></div>
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-accent1 bg-opacity-10 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                alt="Yassine Erradouani" 
                className="relative z-10 rounded-2xl shadow-xl object-cover h-[380px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
