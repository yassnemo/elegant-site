import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { setupIntersectionObserver } from '@/lib/utils';
import { projects } from '@/data';
import { Button } from '@/components/ui/button';

const ProjectDetailPage = () => {
  const [, params] = useRoute('/projects/:slug');
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    if (params?.slug) {
      const foundProject = projects.find(p => p.slug === params.slug);
      if (foundProject) {
        setProject(foundProject);
        document.title = `${foundProject.title} | Yassine Erradouani`;
      }
    }
  }, [params]);

  if (!project) {
    return (
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-8">Sorry, the project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button variant="default">Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <AnimatedSection className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-8">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full rounded-xl overflow-hidden shadow-lg">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{project.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string, i: number) => (
                      <span key={i} className="bg-white/20 text-white text-xs md:text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <div className="prose max-w-none">
                  {project.longDescription.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4 text-gray-600">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">PROJECT TYPE</h4>
                      <p className="font-medium">Data Science & AI</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.technologies.map((tech: string, i: number) => (
                          <span key={i} className="bg-primary text-white text-xs px-2 py-1 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex flex-col space-y-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#24292e] text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                          >
                            <i className="ri-github-fill mr-2 text-lg"></i>
                            View on GitHub
                          </a>
                        )}
                        
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-primary text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                          >
                            <i className="ri-external-link-line mr-2 text-lg"></i>
                            View Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <Link href="/projects" className="flex items-center text-primary hover:underline mb-4 sm:mb-0">
                  <i className="ri-arrow-left-line mr-2"></i>
                  Back to all projects
                </Link>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-4">Share:</span>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                      <i className="ri-twitter-fill text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                      <i className="ri-linkedin-fill text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                      <i className="ri-facebook-fill text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ProjectDetailPage;