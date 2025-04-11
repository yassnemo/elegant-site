import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import BlogSection from '@/components/home/BlogSection';
import BookshelfSection from '@/components/home/BookshelfSection';
import ResumeSection from '@/components/home/ResumeSection';
import ContactSection from '@/components/home/ContactSection';
import { setupIntersectionObserver } from '@/lib/utils';

const HomePage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Yassine Erradouani | Data Science & AI Portfolio';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <BookshelfSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
