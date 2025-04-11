import { useEffect } from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { setupIntersectionObserver } from '@/lib/utils';
import { skills, education, experience } from '@/data';

const ResumePage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Resume | Yassine Erradouani';
    
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
            eyebrow="Resume"
            title="Professional Summary"
            description="My qualifications, skills, and experience."
          />
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 section-transition">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-gray-700 mb-4">
                I'm a data science and machine learning student with a passion for using AI to create real-world impact. 
                I specialize in developing predictive models and analyzing complex datasets to extract meaningful insights.
                My interests span across chess analysis, psychology, history, and examining human behavior patterns.
              </p>
              <p className="text-gray-700">
                Currently seeking opportunities to apply my technical skills in data science, machine learning, 
                and artificial intelligence to solve challenging problems.
              </p>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 inline-flex items-center">
                <i className="ri-code-box-line text-primary mr-2"></i> Technical Skills
              </h2>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className={index % 3 === 0 ? "skill-pill bg-primary text-white px-4 py-2 rounded-full text-sm font-medium" : "skill-pill bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 inline-flex items-center">
                <i className="ri-government-line text-primary mr-2"></i> Education
              </h2>
              
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary pl-5 py-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-[18px]"></div>
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    <p className="text-gray-500">{edu.period}</p>
                    {edu.description && <p className="text-gray-600 mt-2">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 inline-flex items-center">
                <i className="ri-briefcase-4-line text-primary mr-2"></i> Work Experience
              </h2>
              
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-5 py-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-[18px]"></div>
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                    <p className="text-gray-500">{exp.period}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                    
                    {exp.achievements && (
                      <div className="mt-3">
                        <p className="font-medium">Key Achievements:</p>
                        <ul className="list-disc pl-5 mt-1 text-gray-600">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <a 
                href="/assets/yassine-erradouani-resume.pdf" 
                className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-download-line"></i> Download Resume PDF
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ResumePage;
