// Email configuration
// For production, these should be environment variables

export const emailConfig = {
  // Email service settings
  service: 'gmail', // You can also use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER || 'your-email-account@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
  
  // Email sending settings
  from: process.env.EMAIL_FROM || 'Portfolio Contact Form <your-email-account@gmail.com>',
  to: process.env.EMAIL_TO || 'yassine.erradouani@protonmail.com',
};