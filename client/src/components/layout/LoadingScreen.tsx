import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  duration?: number;
}

const LoadingScreen = ({ duration = 2000 }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the loading screen after the specified duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: "easeInOut" }
          }}
        >
          <div className="relative">
            {/* Simple and elegant Y animation */}
            <motion.div
              className="w-32 h-32 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
              >
                {/* Y letter fill */}
                <motion.path
                  d="M30,15 L50,55 L70,15 L80,15 L55,60 L55,85 L45,85 L45,60 L20,15 Z"
                  fill="#ABF312"
                  initial={{ fillOpacity: 0 }}
                  animate={{ fillOpacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                
                {/* Animated drawing outline */}
                <motion.path
                  d="M30,15 L50,55 L70,15 L80,15 L55,60 L55,85 L45,85 L45,60 L20,15 Z"
                  fill="transparent"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Animated continuous moving outline */}
                <motion.path
                  d="M30,15 L50,55 L70,15 L80,15 L55,60 L55,85 L45,85 L45,60 L20,15 Z"
                  fill="transparent"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="5,5"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: [0.5, 1, 0.5],
                    strokeDashoffset: [0, -20, -40]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ opacity: 0.4 }}
                />
              </svg>
            </motion.div>
            
            {/* Simple horizontal line that expands */}
            <motion.div
              className="h-[2px] bg-black absolute bottom-0 left-0 right-0"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.5 
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;