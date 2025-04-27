import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SectionHeading from '@/components/shared/SectionHeading';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Use environment variables for EmailJS credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );
      
      if (result.status === 200) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
          variant: "default",
        });
        
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
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
    <AnimatedSection id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Connect"
          description="Interested in working together or have a question? Feel free to reach out!"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="section-transition">
            <div className="bg-white dark:bg-[#112240] p-8 rounded-xl shadow-lg">
              <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-[#64FFDA] focus:ring focus:ring-primary dark:focus:ring-[#64FFDA] focus:ring-opacity-20 transition-all outline-none dark:bg-[#0A192F] dark:text-gray-200" 
                            {...field} 
                            name="user_name"
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
                        <FormLabel className="dark:text-gray-200">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            type="email" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-[#64FFDA] focus:ring focus:ring-primary dark:focus:ring-[#64FFDA] focus:ring-opacity-20 transition-all outline-none dark:bg-[#0A192F] dark:text-gray-200"
                            {...field} 
                            name="user_email"
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
                        <FormLabel className="dark:text-gray-200">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message..." 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-[#64FFDA] focus:ring focus:ring-primary dark:focus:ring-[#64FFDA] focus:ring-opacity-20 transition-all outline-none dark:bg-[#0A192F] dark:text-gray-200" 
                            rows={5}
                            {...field} 
                            name="message"
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-opacity-90 dark:bg-[#64FFDA] dark:text-[#0A192F] dark:hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="section-transition">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary dark:bg-[#64FFDA] p-3 rounded-full mr-4">
                  <i className="ri-mail-line text-white dark:text-[#0A192F] text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 dark:text-gray-200">Email</h3>
                  <p className="text-gray-600 dark:text-[#8892B0]">yassine.erradouani@protonmail.com</p>
                  <p className="text-gray-500 dark:text-[#8892B0] text-sm">I typically respond within 24 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary dark:bg-[#64FFDA] p-3 rounded-full mr-4">
                  <i className="ri-map-pin-line text-white dark:text-[#0A192F] text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 dark:text-gray-200">Location</h3>
                  <p className="text-gray-600 dark:text-[#8892B0]">Morocco</p>
                  <p className="text-gray-500 dark:text-[#8892B0] text-sm">Available for remote opportunities worldwide.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary dark:bg-[#64FFDA] p-3 rounded-full mr-4">
                  <i className="ri-links-line text-white dark:text-[#0A192F] text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 dark:text-gray-200">Social</h3>
                  <div className="flex gap-3 mt-2">
                    <a 
                      href="https://github.com/yassine-erradouani" 
                      className="bg-gray-100 dark:bg-[#112240] p-2 rounded-full hover:bg-primary dark:hover:bg-[#64FFDA] hover:text-white dark:hover:text-[#0A192F] transition-all dark:text-[#8892B0]"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                    >
                      <i className="ri-github-fill text-xl"></i>
                    </a>
                    <a 
                      href="https://linkedin.com/in/yassine-erradouani" 
                      className="bg-gray-100 dark:bg-[#112240] p-2 rounded-full hover:bg-primary dark:hover:bg-[#64FFDA] hover:text-white dark:hover:text-[#0A192F] transition-all dark:text-[#8892B0]"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                    >
                      <i className="ri-linkedin-fill text-xl"></i>
                    </a>
                    <a 
                      href="https://medium.com/@yassine-erradouani" 
                      className="bg-gray-100 dark:bg-[#112240] p-2 rounded-full hover:bg-primary dark:hover:bg-[#64FFDA] hover:text-white dark:hover:text-[#0A192F] transition-all dark:text-[#8892B0]"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Medium profile"
                    >
                      <i className="ri-medium-fill text-xl"></i>
                    </a>
                    <a 
                      href="https://soundcloud.com/yassine-erradouani" 
                      className="bg-gray-100 dark:bg-[#112240] p-2 rounded-full hover:bg-primary dark:hover:bg-[#64FFDA] hover:text-white dark:hover:text-[#0A192F] transition-all dark:text-[#8892B0]"
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
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;
