import app from './app';
import { env } from './config/env';
import { connectDB } from './config/database';
import { logger } from './config/logger';

connectDB().then(() => {
  app.listen(env.PORT, () => logger.info(`Server running on port ${env.PORT}`));
});
