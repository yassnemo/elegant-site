import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (!isClient) return;
    
    const mobileCheck = () => {
      try {
          let check = false;
          // Only run when navigator is available (client-side)
          if (typeof navigator !== 'undefined') {
              const agent = navigator.userAgent || navigator.vendor || ((window as any).opera ? (window as any).opera : '');
              // Simplify the regex check by directly testing the agent string.
              if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent.substr(0,4))) {
                  check = true;
              }
          }
          return check;
      } catch (error) {
          console.error('Error detecting mobile device:', error);
          return false;
      }
  };

    // Set the mobile state
    const isMobile = mobileCheck();
    setIsMobileDevice(isMobile);

    // Don't add event listeners on mobile devices
    if (isMobile) {
      // Make sure the cursor is visible on mobile
      document.body.style.cursor = 'auto';
      return;
    }

    // ENSURE DEFAULT CURSOR IS VISIBLE FIRST
    // Only hide the default cursor after we confirm the component is mounted
    // This prevents the site from being invisible if the component fails
    setTimeout(() => {
      try {
        document.body.classList.add('cursor-custom');
        document.body.style.cursor = 'none';
        setIsInitialized(true);
        console.log("Custom cursor initialized");
      } catch (error) {
        console.error('Error setting cursor style:', error);
        document.body.style.cursor = 'auto';
      }
    }, 100);

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    // Set up event listeners
    addEventListeners();
    setHidden(false);

    return () => {
      removeEventListeners();
      // Restore default cursor on unmount
      document.body.style.cursor = 'auto';
    };
  }, [isClient]); // Add isClient as dependency

  // Don't render anything during SSR or on mobile devices
  if (!isClient || isMobileDevice) return null;

  return (
    <div 
      className={`fixed w-8 h-8 rounded-full pointer-events-none z-[9999] transition-transform duration-100 mix-blend-difference ${
        hidden ? 'opacity-0' : 'opacity-100'
      } ${
        clicked ? 'scale-75' : 'scale-100'
      } ${
        linkHovered ? 'scale-150 bg-white' : 'bg-primary/30'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${
          clicked ? 'scale(0.75)' : linkHovered ? 'scale(1.5)' : 'scale(1)'
        }`,
      }}
    />
  );
};

export default CustomCursor;
