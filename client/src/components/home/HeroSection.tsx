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
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <p className="text-primary font-medium mb-4 text-lg">Hello there, I'm</p>
            <h1 ref={headingRef} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Yassine Erradouani</h1>
            <p ref={textRef} className="text-xl md:text-2xl text-gray-600 mb-8">
              A Data Science & Machine Learning student passionate about using <span className="text-primary font-medium">AI for real-world impact</span>.
            </p>
            
            <div ref={tagsRef} className="flex flex-wrap gap-3 mb-8">
              <span className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full text-sm">Data Science</span>
              <span className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full text-sm">Machine Learning</span>
              <span className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full text-sm">AI Enthusiast</span>
              <span className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full text-sm">Chess Analyzer</span>
            </div>
            
            <div ref={buttonsRef} className="flex gap-4">
              <Button 
                className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2"
                onClick={() => scrollToSection('projects')}
              >
                View Projects <i className="ri-arrow-right-line"></i>
              </Button>
              <Button 
                variant="outline" 
                className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-medium transition-all"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </Button>
            </div>
          </div>
          
          <div ref={imageRef} className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary bg-opacity-10 rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent1 bg-opacity-10 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                alt="Yassine Erradouani" 
                className="relative z-10 rounded-2xl shadow-xl object-cover h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
