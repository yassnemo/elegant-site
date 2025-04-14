// Serverless API handler for Vercel
import express from 'express';
import app from '../server/index.js';

// This exports a handler function for Vercel's serverless functions
export default async function handler(req, res) {
  // Forward the request to our Express app
  try {
    const expressApp = await app;
    expressApp(req, res);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}