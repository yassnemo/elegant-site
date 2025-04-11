import { useState, useRef, useEffect, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  transitionSpeed?: number;
  trackMouse?: boolean;
}

const TiltCard = ({
  children,
  className = '',
  maxTilt = 15,
  scale = 1.05,
  perspective = 1000,
  transitionSpeed = 400,
  trackMouse = true,
}: TiltCardProps) => {
  const [tiltStyle, setTiltStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
    transition: `transform ${transitionSpeed}ms ease-out`,
  });
  
  const cardRef = useRef<HTMLDivElement>(null);
  const updateTiltRef = useRef<NodeJS.Timeout | null>(null);
  
  const updateTilt = (e: MouseEvent) => {
    if (!cardRef.current || !trackMouse) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate the center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the mouse position relative to the center of the card
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate the rotation angle
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    const rotateX = -((mouseY / (rect.height / 2)) * maxTilt);
    
    // Update the card style
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: `transform ${transitionSpeed}ms ease-out`,
    });
  };
  
  const resetTilt = () => {
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
      transition: `transform ${transitionSpeed}ms ease-out`,
    });
  };
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle the tilt update for better performance
      if (updateTiltRef.current) clearTimeout(updateTiltRef.current);
      updateTiltRef.current = setTimeout(() => updateTilt(e), 10);
    };
    
    const handleMouseLeave = () => {
      resetTilt();
    };
    
    if (trackMouse) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (trackMouse && card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      if (updateTiltRef.current) {
        clearTimeout(updateTiltRef.current);
      }
    };
  }, [trackMouse, maxTilt, scale, perspective, transitionSpeed]);
  
  return (
    <div 
      ref={cardRef} 
      className={className}
      style={tiltStyle}
    >
      {children}
    </div>
  );
};

export default TiltCard;