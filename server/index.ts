import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Modified to support both direct execution and import from Vercel serverless function
const setupServer = async () => {
  // Register routes and get the HTTP server instance
  const httpServer = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite in development, or serve static assets in production
  if (app.get("env") === "development") {
    await setupVite(app, httpServer);
  } else {
    serveStatic(app);
  }

  // Return the underlying HTTP server for listening
  return httpServer;
};

// For Vercel serverless functions
// Exported promise resolves to HTTP server (useful for local dev)
export default setupServer;

// For local development: use configurable port/host, defaulting to 5173 (Vite default) on IPv4
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  (async () => {
    // Initialize server and then start listening
    const httpServer = await setupServer();
    // Bind to IPv4 only to avoid IPv6 address in use errors
    const host = process.env.HOST || "127.0.0.1";
    const port = parseInt(process.env.PORT || "5173", 10);
    httpServer.listen(port, host)
      .on('listening', () => {
        console.log(`Server running and proxying Vite on http://${host}:${port}`);
        console.log(`Open your browser and navigate to http://localhost:${port}`);
      })
      .on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use. Please free it or set a different PORT.`);
        } else {
          console.error('Server error:', err);
        }
        process.exit(1);
      });
  })();
}
