import { motion, AnimatePresence } from 'framer-motion';

// Remove duration prop as it's no longer controlled internally
// interface LoadingScreenProps {
//   duration?: number;
// }

// Remove the duration prop from the function signature
const LoadingScreen = (/*{ duration = 2000 }: LoadingScreenProps*/) => {
  // Remove internal state and effect
  // const [isVisible, setIsVisible] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsVisible(false);
  //   }, duration);
  //   return () => clearTimeout(timer);
  // }, [duration]);

  // The component now just returns the motion.div
  // AnimatePresence in the parent will handle the exit animation
  return (
    // Remove AnimatePresence and isVisible check from here
    // <AnimatePresence>
    //  {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-background z-50" // Use theme background
          key="loading-screen" // Add a key for AnimatePresence
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: "easeInOut" }
          }}
        >
          {/* ... rest of the SVG animation code ... */}
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
                {/* Y letter fill - using the same path from favicon */}
                <motion.path
                  d="M28 22C30 22 32 23 33 25L50 58L67 25C68 23 70 22 72 22C75 22 78 24 78 27C78 28 77.5 29 77 30L57 62C56 64 55.5 65 55.5 67L55.5 79C55.5 82 53 85 50 85C47 85 45 82 45 79L45 67C45 65 44.5 64 44 62L24 30C23.5 29 23 28 23 27C23 24 25 22 28 22Z"
                  fill="hsl(var(--primary))" // Use theme primary color
                  initial={{ fillOpacity: 0 }}
                  animate={{ fillOpacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Animated drawing outline */}
                <motion.path
                  d="M28 22C30 22 32 23 33 25L50 58L67 25C68 23 70 22 72 22C75 22 78 24 78 27C78 28 77.5 29 77 30L57 62C56 64 55.5 65 55.5 67L55.5 79C55.5 82 53 85 50 85C47 85 45 82 45 79L45 67C45 65 44.5 64 44 62L24 30C23.5 29 23 28 23 27C23 24 25 22 28 22Z"
                  fill="transparent"
                  stroke="hsl(var(--foreground))" // Use theme foreground
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
                  d="M28 22C30 22 32 23 33 25L50 58L67 25C68 23 70 22 72 22C75 22 78 24 78 27C78 28 77.5 29 77 30L57 62C56 64 55.5 65 55.5 67L55.5 79C55.5 82 53 85 50 85C47 85 45 82 45 79L45 67C45 65 44.5 64 44 62L24 30C23.5 29 23 28 23 27C23 24 25 22 28 22Z"
                  fill="transparent"
                  stroke="hsl(var(--foreground))" // Use theme foreground
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
              className="h-[2px] bg-foreground absolute bottom-0 left-0 right-0" // Use theme foreground
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
    //  )}
    // </AnimatePresence>
  );
};

export default LoadingScreen;