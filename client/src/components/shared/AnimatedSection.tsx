import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

const AnimatedSection = ({ 
  children, 
  id, 
  className,
  delay = 0
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const section = sectionRef.current;
    
    gsap.set(section, { 
      opacity: 0,
      y: 20
    });
    
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.to(section, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: delay,
          ease: "power3.out" 
        });
      },
      once: true
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [delay]);
  
  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={cn('min-h-[90vh] py-8', className)}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
