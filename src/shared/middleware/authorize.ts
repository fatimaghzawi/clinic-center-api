import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import type { UserRole } from '../constants/roles';

export const authorize = (...roles: UserRole[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('You do not have permission', 403));
  }
  next();
};

export const restrictTo = authorize;
