import { Link } from 'wouter';
import AnimatedSection from '@/components/shared/AnimatedSection';

const AboutSection = () => {
  return (
    <AnimatedSection className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center">About Me</h2>
          
          <div className="space-y-6 section-transition">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              I'm a 21-year-old second-year Data Science & Machine Learning student with a passion for leveraging AI to create meaningful impact. Beyond coding and algorithms, I enjoy teaching, analyzing chess games with AI, and exploring the intersections of psychology, history, and human behavior.
            </p>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              My technical journey has led me to work on advanced projects like fraud detection systems and personalized news aggregators, constantly pushing the boundaries of what's possible with data and machine learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 section-transition">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-base md:text-lg font-mono font-semibold mb-3">Education</h3>
              <p className="text-gray-600">Data Science & ML</p>
              <p className="text-gray-500 text-sm">2022 - Present</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-base md:text-lg font-mono font-semibold mb-3">Location</h3>
              <p className="text-gray-600">Morocco</p>
              <p className="text-gray-500 text-sm">Open to Remote Opportunities</p>
            </div>
          </div>
          
          <div className="mt-10 text-center section-transition">
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
