import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Redirect all API requests to the main server handler
  const serverHandler = await import('./server');
  return serverHandler.default(req, res);
}