import { useEffect } from 'react';
import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { setupIntersectionObserver } from '@/lib/utils';
import { projects } from '@/data';

const ProjectsPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Projects | Yassine Erradouani';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <AnimatedSection className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="All Projects"
            description="Explore all of my data science and AI projects."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg project-card section-transition"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link href={`/projects/${project.slug}`} className="text-primary font-medium hover:underline">
                      View Project
                    </Link>
                    <div className="flex space-x-2">
                      {project.github && (
                        <a 
                          href={project.github} 
                          className="text-gray-500 hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub repository"
                        >
                          <i className="ri-github-fill text-xl"></i>
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          className="text-gray-500 hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live demo"
                        >
                          <i className="ri-external-link-line text-xl"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ProjectsPage;
