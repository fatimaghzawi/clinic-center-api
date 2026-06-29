import type { NextFunction, Request, Response } from 'express';
import User, { type IUserDocument } from '../../modules/auth/models/user.model';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync.js';
import { ACCESS_TOKEN_COOKIE } from '../utils/cookies';
import { verifyAccessToken } from '../utils/jwt.js';

const getAccessToken = (req: Request): string | undefined => {
  const cookieToken = req.cookies?.[ACCESS_TOKEN_COOKIE];
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  return undefined;
};

export const authenticate = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const token = getAccessToken(req);
  if (!token) {
    return next(new AppError('Not authenticated', 401));
  }

  const decoded = verifyAccessToken(token);
  const user = (await User.findById(decoded.id)) as IUserDocument | null;

  if (!user || user.isDeleted) {
    return next(new AppError('User no longer exists', 401));
  }
  if (!user.isActive) {
    return next(new AppError('Account is deactivated', 403));
  }

  req.user = user;
  next();
});

export const protect = authenticate;
