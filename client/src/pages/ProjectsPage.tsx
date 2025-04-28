import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { setupIntersectionObserver } from '@/lib/utils';
import { projects } from '@/data';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  useEffect(() => {
    // Set page title
    document.title = 'Projects | Yassine Erradouani';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  // Extract all unique technologies from projects
  const allTechnologies = [
    'All', 
    ...Array.from(new Set(projects.flatMap(project => project.technologies)))
  ];
  
  // Filter projects based on active technology filter
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.technologies.includes(activeFilter)
      ));
    }
  }, [activeFilter]);

  return (
    <div className="pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Projects</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A showcase of my data science and machine learning projects, 
              focused on creating AI solutions with real-world impact.
            </p>
          </div>
          
          {/* Filter by technology */}
          <div className="mb-10 overflow-x-auto pb-2 max-w-4xl mx-auto">
            <div className="flex space-x-3">
              {allTechnologies.map((tech, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(tech)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === tech 
                      ? 'bg-primary text-white dark:text-gray-900 shadow-sm' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects grid with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <Link 
                key={index} 
                href={`/projects/${project.slug}`}
                className="group"
              >
                <div className="project-card-wrapper">
                  <div className="card-border-gradient"></div>
                  <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 section-transition h-full flex flex-col w-full">
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 text-white">
                          <div className="font-medium">View Project</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{project.description}</p>
                      
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span 
                              key={i} 
                              className="bg-[#ABF312] dark:bg-[#64FFDA] text-gray-700 dark:text-gray-900 text-xs px-3 py-1 rounded-full cursor-pointer font-semibold"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveFilter(tech);
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-primary dark:text-[#64FFDA] font-medium group-hover:translate-x-1 transition-transform flex items-center">
                            Details <i className="ri-arrow-right-line ml-1"></i>
                          </div>
                          
                          <div className="flex space-x-3">
                            {project.github && (
                              <span 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.github, '_blank', 'noopener,noreferrer');
                                }}
                                className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-[#64FFDA] transition-colors cursor-pointer"
                                aria-label="GitHub repository"
                              >
                                <i className="ri-github-fill text-xl"></i>
                              </span>
                            )}
                            {project.demo && (
                              <span 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.demo, '_blank', 'noopener,noreferrer');
                                }}
                                className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-[#64FFDA] transition-colors cursor-pointer"
                                aria-label="Live demo"
                              >
                                <i className="ri-external-link-line text-xl"></i>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No projects found with this technology.</p>
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ProjectsPage;
