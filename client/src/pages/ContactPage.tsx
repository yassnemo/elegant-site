import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { setupIntersectionObserver } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Set page title
    document.title = 'Contact | Yassine Erradouani';
    
    // Set up the intersection observer for section animations
    setupIntersectionObserver();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // For now, we'll just simulate a successful form submission
      // In a real app, we'd send this data to the backend
      
      // Uncomment this to actually send the form data to the server
      // await apiRequest('POST', '/api/contact', data);
      
      // For this demo, we'll just simulate a success response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <AnimatedSection className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow="Contact"
            title="Get In Touch"
            description="Have a question or want to work together? Send me a message!"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 section-transition">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-[#64FFDA] focus:ring focus:ring-primary dark:focus:ring-[#64FFDA] focus:ring-opacity-20 transition-all outline-none dark:bg-gray-900 dark:text-gray-200" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                type="email" 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-[#64FFDA] focus:ring focus:ring-primary dark:focus:ring-[#64FFDA] focus:ring-opacity-20 transition-all outline-none dark:bg-gray-900 dark:text-gray-200"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-300">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What is this about?" 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-[#64FFDA] focus:ring focus:ring-primary dark:focus:ring-[#64FFDA] focus:ring-opacity-20 transition-all outline-none dark:bg-gray-900 dark:text-gray-200" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-300">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message..." 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-[#64FFDA] focus:ring focus:ring-primary dark:focus:ring-[#64FFDA] focus:ring-opacity-20 transition-all outline-none dark:bg-gray-900 dark:text-gray-200" 
                              rows={7}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-opacity-90 dark:bg-[#64FFDA] dark:text-gray-900 dark:hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-all"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            <div className="lg:col-span-2 section-transition">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-6 dark:text-gray-100">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-primary dark:bg-[#64FFDA] p-3 rounded-full mr-4">
                      <i className="ri-mail-line text-white dark:text-gray-900 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1 dark:text-gray-200">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300">yassine.erradouani@example.com</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">I typically respond within 24 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary dark:bg-[#64FFDA] p-3 rounded-full mr-4">
                      <i className="ri-map-pin-line text-white dark:text-gray-900 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1 dark:text-gray-200">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">Morocco</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Available for remote opportunities worldwide.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary dark:bg-[#64FFDA] p-3 rounded-full mr-4">
                      <i className="ri-links-line text-white dark:text-gray-900 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1 dark:text-gray-200">Social</h4>
                      <div className="flex gap-3 mt-2">
                        <a 
                          href="https://github.com/yassine-erradouani" 
                          className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-primary hover:text-white dark:hover:bg-[#64FFDA] dark:hover:text-gray-900 transition-all text-gray-700 dark:text-[#64FFDA]"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub profile"
                        >
                          <i className="ri-github-fill text-xl"></i>
                        </a>
                        <a 
                          href="https://linkedin.com/in/yassine-erradouani" 
                          className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-primary hover:text-white dark:hover:bg-[#64FFDA] dark:hover:text-gray-900 transition-all text-gray-700 dark:text-[#64FFDA]"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn profile"
                        >
                          <i className="ri-linkedin-fill text-xl"></i>
                        </a>
                        <a 
                          href="https://medium.com/@yassine-erradouani" 
                          className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-primary hover:text-white dark:hover:bg-[#64FFDA] dark:hover:text-gray-900 transition-all text-gray-700 dark:text-[#64FFDA]"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Medium profile"
                        >
                          <i className="ri-medium-fill text-xl"></i>
                        </a>
                        <a 
                          href="https://soundcloud.com/yassine-erradouani" 
                          className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-primary hover:text-white dark:hover:bg-[#64FFDA] dark:hover:text-gray-900 transition-all text-gray-700 dark:text-[#64FFDA]"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="SoundCloud profile"
                        >
                          <i className="ri-soundcloud-fill text-xl"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-lg font-bold mb-3 dark:text-gray-200">Let's Connect</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Whether you have a question about my projects, want to collaborate, or just want to say hello, feel free to reach out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactPage;
