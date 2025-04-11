import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { skills, education, experience } from '@/data';

const ResumeSection = () => {
  return (
    <AnimatedSection id="resume" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Resume"
          title="My Experience"
          description="A summary of my education, skills, and professional experience."
        />
        
        <div className="mb-16 section-transition">
          <h3 className="text-2xl font-bold mb-6 inline-flex items-center">
            <i className="ri-code-box-line text-primary mr-2"></i> Technical Skills
          </h3>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="skill-pill bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="section-transition">
            <h3 className="text-2xl font-bold mb-6 inline-flex items-center">
              <i className="ri-government-line text-primary mr-2"></i> Education
            </h3>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className={`border-l-2 ${index === 0 ? 'border-primary' : 'border-gray-200'} pl-5 py-2 relative`}
                >
                  <div className={`absolute w-3 h-3 ${index === 0 ? 'bg-primary' : 'bg-gray-200'} rounded-full -left-[7px] top-[18px]`}></div>
                  <h4 className="text-lg font-bold">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="section-transition">
            <h3 className="text-2xl font-bold mb-6 inline-flex items-center">
              <i className="ri-briefcase-4-line text-primary mr-2"></i> Experience
            </h3>
            
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div 
                  key={index} 
                  className={`border-l-2 ${index === 0 ? 'border-primary' : 'border-gray-200'} pl-5 py-2 relative`}
                >
                  <div className={`absolute w-3 h-3 ${index === 0 ? 'bg-primary' : 'bg-gray-200'} rounded-full -left-[7px] top-[18px]`}></div>
                  <h4 className="text-lg font-bold">{exp.position}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-gray-500 text-sm">{exp.period}</p>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center section-transition">
          <a 
            href="/assets/yassine-erradouani-resume.pdf" 
            className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-download-line"></i> Download Full Resume
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ResumeSection;
