import type { CookieOptions, Response } from 'express';
import { env } from '../../config/env';

export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

const parseDurationToMs = (duration: string): number => {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 15 * 60 * 1000;

  const value = Number(match[1]);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 } as const;
  return value * multipliers[unit as keyof typeof multipliers];
};

const baseCookieOptions = (): CookieOptions => {
  const isProduction = env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };
};

const accessTokenOptions = (): CookieOptions => ({
  ...baseCookieOptions(),
  path: '/',
  maxAge: parseDurationToMs(env.JWT_EXPIRES_IN),
});

const refreshTokenOptions = (): CookieOptions => ({
  ...baseCookieOptions(),
  path: '/api/auth',
  maxAge: parseDurationToMs(env.JWT_REFRESH_EXPIRES_IN),
});

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenOptions());
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshTokenOptions());
};

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenOptions());
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(ACCESS_TOKEN_COOKIE, accessTokenOptions());
  res.clearCookie(REFRESH_TOKEN_COOKIE, refreshTokenOptions());
};
