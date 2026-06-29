import 'dotenv/config';
import { connectDB } from '../config/database';
import User from '../modules/auth/models/user.model';
import { hashPassword } from '../shared/utils/password';
import { logger } from '../config/logger';

const seed = async () => {
  await connectDB();

  const existing = await User.findOne({ username: 'admin' });
  if (existing) {
    logger.info('Admin user already exists — skipping seed');
    process.exit(0);
  }

  const passwordHash = await hashPassword('Admin@123456');
  await User.create({
    username: 'admin',
    passwordHash,
    role: 'admin',
  });

  logger.info('Seed complete: admin user created (username: admin, password: Admin@123456)');
  process.exit(0);
};

seed().catch((err: unknown) => {
  logger.error('Seed failed', { error: err });
  process.exit(1);
});
