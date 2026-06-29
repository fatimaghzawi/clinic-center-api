import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { handleMongoError } from '../../config/database';
import { env } from '../../config/env';
import { logger } from '../../config/logger';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  let error: AppError | Error = err instanceof Error ? err : new Error('Unknown error');

  if (err instanceof mongoose.Error) {
    error = handleMongoError(err);
  }

  if (error instanceof Error && error.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token', 401);
  }
  if (error instanceof Error && error.name === 'TokenExpiredError') {
    error = new AppError('Token expired', 401);
  }
  if (err instanceof ZodError) {
    const messages = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
    error = new AppError(messages.join(', '), 422);
  }

  const appError = error instanceof AppError ? error : null;
  const statusCode = appError?.statusCode ?? 500;
  const message = appError?.isOperational ? appError.message : 'Internal server error';
  const isOperational = appError?.isOperational ?? false;

  if (env.NODE_ENV !== 'production' && !isOperational) {
    logger.error('Unhandled error', { error: err });
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(env.NODE_ENV !== 'production' && !isOperational && error instanceof Error && { stack: error.stack }),
  });
};
