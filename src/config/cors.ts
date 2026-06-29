import cors from 'cors';
import { env } from './env';

const allowedOrigins = env.CORS_ORIGIN.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
