import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// Import nodemailer for email functionality
import nodemailer from 'nodemailer';
// Import email configuration
import { emailConfig } from './config/email';

// Create a transporter for email sending
const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: emailConfig.auth,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact API endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate request data
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }
      
      // Prepare email
      const mailOptions = {
        from: emailConfig.from,
        to: emailConfig.to,
        subject: subject || `New contact form submission from ${name}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };
      
      // Send email
      await transporter.sendMail(mailOptions);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received! I will get back to you soon.'
      });
      
    } catch (error) {
      console.error('Error in contact endpoint:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while sending your message. Please try again later.'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
