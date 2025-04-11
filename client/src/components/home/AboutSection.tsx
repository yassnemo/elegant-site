import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-2/5 section-transition">
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
              alt="Yassine working" 
              className="rounded-2xl shadow-lg object-cover h-[500px]"
            />
          </div>
          
          <div className="md:w-3/5 section-transition">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-600 mb-6 text-lg">
              I'm a 21-year-old second-year Data Science & Machine Learning student with a passion for leveraging AI to create meaningful impact. Beyond coding and algorithms, I enjoy teaching, analyzing chess games with AI, and exploring the intersections of psychology, history, and human behavior.
            </p>
            
            <p className="text-gray-600 mb-8 text-lg">
              My technical journey has led me to work on advanced projects like fraud detection systems and personalized news aggregators, constantly pushing the boundaries of what's possible with data and machine learning.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Education</h3>
                <p className="text-gray-600">Data Science & ML</p>
                <p className="text-gray-500 text-sm">2022 - Present</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Location</h3>
                <p className="text-gray-600">Morocco</p>
                <p className="text-gray-500 text-sm">Open to Remote Opportunities</p>
              </div>
            </div>
            
            <Link href="/resume" className="inline-flex items-center text-primary hover:underline font-medium">
              View My Resume <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
