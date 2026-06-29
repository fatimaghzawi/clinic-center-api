import mongoose from 'mongoose';
import { AppError } from '../shared/utils/AppError';
import { env } from './env';
import { logger } from './logger';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`MongoDB connection error: ${message}`);
    process.exit(1);
  }
};

export const handleMongoError = (err: mongoose.Error | (Error & { code?: number; keyValue?: Record<string, unknown>; errors?: Record<string, { message: string }>; path?: string; value?: unknown })) => {
  if ('code' in err && err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'field';
    return new AppError(`${field} already exists`, 409);
  }
  if (err.name === 'ValidationError' && 'errors' in err && err.errors) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return new AppError(messages.join(', '), 422);
  }
  if (err.name === 'CastError' && 'path' in err) {
    return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }
  return err;
};
