import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ZigZagLine from '@/components/svg/ZigZagLine';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dotsRef1 = useRef<HTMLDivElement>(null);
  const dotsRef2 = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const skillsRef1 = useRef<HTMLDivElement>(null);
  const skillsRef2 = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
    .fromTo(subtitleRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.5"
    )
    .fromTo(imageRef.current, 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.8 }, 
      "-=0.6"
    )
    .fromTo([dotsRef1.current, dotsRef2.current, line1Ref.current, line2Ref.current], 
      { opacity: 0 }, 
      { opacity: 1, stagger: 0.1, duration: 0.5 }, 
      "-=0.4"
    )
    .fromTo([skillsRef1.current, skillsRef2.current], 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }, 
      "-=0.3"
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <section id="home" ref={sectionRef} className="hero-container">
      <div className="hero-left-bg"></div>
      <div className="hero-right-bg"></div>
      
      <div className="hero-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 ref={titleRef} className="hero-title">
              Data Science<br />
              Student.
            </h1>
            <p ref={subtitleRef} className="hero-subtitle">
              I like to craft AI solutions for real-world problems with great user experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div ref={skillsRef1} className="text-white/90 text-sm">
                <p className="mb-1 text-white/70">Highly skilled at</p>
                <p>data analysis, machine learning models & AI Engineering.</p>
              </div>
              
              <div ref={skillsRef2} className="text-white/90 text-sm">
                <p className="mb-1 text-white/70">Proven experience building</p>
                <p>impactful data science projects for real-world applications.</p>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
              alt="Yassine Erradouani" 
              className="hero-image w-full max-w-md mx-auto"
            />
            
            <div ref={dotsRef1} className="hero-image-dots hero-image-dots-1"></div>
            <div ref={dotsRef2} className="hero-image-dots hero-image-dots-2"></div>
            
            <div ref={line1Ref} className="hero-image-line hero-image-line-1">
              <ZigZagLine stroke="white" strokeWidth={1.5} />
            </div>
            <div ref={line2Ref} className="hero-image-line hero-image-line-2">
              <ZigZagLine stroke="white" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
