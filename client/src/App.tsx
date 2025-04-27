import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import BookshelfPage from "@/pages/BookshelfPage";
import BookReviewPage from "@/pages/BookReviewPage";
import ResumePage from "@/pages/ResumePage";
import ContactPage from "@/pages/ContactPage";
import CertificatesPage from "@/pages/CertificatesPage";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/lib/theme-provider";
// Import motion along with AnimatePresence
import { AnimatePresence, motion } from "framer-motion"; 

function Router() {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/projects/:slug" component={ProjectDetailPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={BlogPostPage} />
          <Route path="/bookshelf" component={BookshelfPage} />
          <Route path="/bookshelf/:slug" component={BookReviewPage} />
          <Route path="/resume" component={ResumePage} />
          <Route path="/certificates" component={CertificatesPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loading screen for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <CustomCursor />
        {/* Wrap the conditional rendering with AnimatePresence */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Pass the key here, LoadingScreen itself defines the exit animation
            <LoadingScreen key="loading" />
          ) : (
            // Add a key to the main content as well for smooth transition
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Router />
              <Toaster />
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
