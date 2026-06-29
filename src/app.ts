import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { corsMiddleware } from './config/cors';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { sanitize } from './shared/middleware/sanitize';
import { apiRateLimiter } from './shared/middleware/rate-limit';
import routes from './routes/index';
import { notFoundHandler } from './shared/middleware/not-found';
import { errorHandler } from './shared/middleware/error-handler';

const app = express();

if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(corsMiddleware);
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sanitize);

app.use('/api', apiRateLimiter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/health', (_req, res) => res.json({ success: true, message: 'OK' }));
app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
