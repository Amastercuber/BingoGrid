import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Request, Response, NextFunction } from 'express';

// This handler will import the express app dynamically to avoid module resolution issues
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Dynamically import the server code to avoid TypeScript issues at build time
    const { default: express } = await import('express');
    const { registerRoutes } = await import('../server/routes');
    const { log } = await import('../server/vite');

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Add middleware for logging
    app.use((req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();
      const path = req.path;
      let capturedJsonResponse: Record<string, any> | undefined = undefined;

      const originalResJson = res.json;
      res.json = function (bodyJson: any) {
        capturedJsonResponse = bodyJson;
        return originalResJson.call(this, bodyJson);
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

    // Register routes
    await registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });

    // Handle the request
    return app(req as any, res as any);
  } catch (error) {
    console.error('Server handler error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}