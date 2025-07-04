# Vercel Deployment Guide

This project is now configured for deployment on Vercel.

## Configuration

The `vercel.json` file has been added to configure:

- **Build Command**: `npm run build` - builds both the React frontend and Express backend
- **Output Directory**: `dist/public` - serves the built React app as static files  
- **API Routes**: `/api/*` requests are handled by serverless functions
- **Client Routing**: All other routes serve the React app's `index.html`

## File Structure

```
api/
├── server.ts        # Main serverless function for API routes
└── [...slug].ts     # Catch-all handler for any missed API routes

dist/
├── index.js         # Built Express server (not used in Vercel)
└── public/          # Built React app (served as static files)
    ├── index.html
    └── assets/

vercel.json          # Vercel deployment configuration
```

## Environment Variables

Make sure to set these environment variables in your Vercel project:

- `DATABASE_URL` - PostgreSQL connection string (if using database features)
- `NODE_ENV` - Set to "production" (configured automatically)

## Deployment Steps

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the `vercel.json` configuration
3. Set any required environment variables in the Vercel dashboard
4. Deploy!

## Local Testing

To test the build locally:

```bash
npm run build    # Build both frontend and backend
npm start        # Run production server locally
```

## API Routes

The Express server's API routes (prefixed with `/api/`) are automatically converted to serverless functions when deployed to Vercel.