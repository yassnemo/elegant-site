import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { projects } from '@/data';

const ProjectsSection = () => {
  return (
    <AnimatedSection id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="A showcase of my work in data science, machine learning, and AI applications."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => (
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-[#ABF312] text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
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
          
          {projects.length > 3 && (
            <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-3 mt-8">
              <Link href="/projects">
                <Button variant="outline" className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
                  View All Projects <i className="ri-arrow-right-line"></i>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
