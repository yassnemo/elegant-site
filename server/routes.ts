import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact API endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate request data
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }
      
      // In a real app, you might want to:
      // 1. Send an email notification
      // 2. Store the contact message in a database
      // 3. Set up some spam protection
      
      // For this demo, we'll just return a success response
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
