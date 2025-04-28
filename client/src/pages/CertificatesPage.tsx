import { useEffect, useState } from 'react';
import { certificates } from '@/data';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { setupIntersectionObserver } from '@/lib/utils';
import { motion } from 'framer-motion';

const CertificatesPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  useEffect(() => {
    // Set page title
    document.title = 'Certificates | Yassine Erradouani';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Extract all unique organizations for filtering
  const allOrganizations = [
    'All', 
    ...Array.from(new Set(certificates.map(cert => cert.organization)))
  ];

  // Filter certificates based on selected organization
  const filteredCertificates = activeFilter === 'All' 
    ? certificates 
    : certificates.filter(cert => cert.organization === activeFilter);

  return (
    <div className="pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Certificates</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional certifications and specialized training in data science, 
              machine learning, and artificial intelligence.
            </p>
          </div>
          
          {/* Filter by organization */}
          <div className="mb-10 overflow-x-auto pb-2 max-w-4xl mx-auto">
            <div className="flex space-x-3">
              {allOrganizations.map((org, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(org)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === org 
                      ? 'bg-primary text-white dark:text-gray-900 shadow-sm' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {org}
                </button>
              ))}
            </div>
          </div>
          
          {/* Certificates grid with animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8 max-w-7xl mx-auto">
            {filteredCertificates.map((certificate, index) => (
              <motion.div 
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={certificate.image} 
                    alt={certificate.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-[#ABF312] dark:bg-[#64FFDA] text-gray-700 dark:text-gray-900 text-xs px-3 py-1 rounded-full font-semibold">
                    {certificate.date}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{certificate.title}</h3>
                  <p className="text-primary dark:text-[#64FFDA] font-medium mb-3">{certificate.organization}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{certificate.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Credential ID: {certificate.credentials}</span>
                    <a 
                      href={certificate.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary dark:text-[#64FFDA] hover:text-primary/80 dark:hover:text-[#64FFDA]/80 transition-colors font-medium text-sm flex items-center gap-1"
                    >
                      Verify <i className="ri-external-link-line"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredCertificates.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No certificates found for this organization.</p>
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CertificatesPage;