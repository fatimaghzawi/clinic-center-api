import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:3000')
    .refine((value) => value !== '*', {
      message:
        'CORS_ORIGIN cannot be "*"; use an explicit origin (comma-separated for multiple)',
    }),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
