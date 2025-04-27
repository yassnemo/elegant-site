import { Link } from 'wouter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: 'ri-github-fill', href: 'https://github.com/yassine-erradouani', ariaLabel: 'GitHub' },
    { icon: 'ri-linkedin-fill', href: 'https://linkedin.com/in/yassine-erradouani', ariaLabel: 'LinkedIn' },
    { icon: 'ri-medium-fill', href: 'https://medium.com/@yassine-erradouani', ariaLabel: 'Medium' },
    { icon: 'ri-soundcloud-fill', href: 'https://soundcloud.com/yassine-erradouani', ariaLabel: 'SoundCloud' },
  ];

  return (
    <footer className="bg-white dark:bg-[#0A192F] py-8 border-t border-gray-100 dark:border-[#112240]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold font-serif dark:text-white">
              Y<span className="text-primary dark:text-[#64FFDA]">.</span>
            </Link>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-600 dark:text-[#8892B0] mb-2">© {currentYear} Yassine Erradouani. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-end">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-gray-500 dark:text-[#8892B0] hover:text-primary dark:hover:text-[#64FFDA] transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                >
                  <i className={`${link.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
