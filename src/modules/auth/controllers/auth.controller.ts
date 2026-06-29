import { AppError } from '../../../shared/utils/AppError';
import { catchAsync } from '../../../shared/utils/catchAsync';
import { clearAuthCookies, REFRESH_TOKEN_COOKIE, setAccessTokenCookie, setAuthCookies } from '../../../shared/utils/cookies';
import { sendSuccess } from '../../../shared/utils/response';
import * as authService from '../services/auth.service';

export const register = catchAsync(async (req, res) => {
  const user = await authService.registerUser(req.body, req.user?._id);
  sendSuccess(res, { id: user._id, username: user.username, role: user.role }, 'User registered', 201);
});

export const login = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(req.body);
  setAuthCookies(res, accessToken, refreshToken);
  sendSuccess(res, {
    user: { id: user._id, username: user.username, role: user.role },
  });
});

export const refresh = catchAsync(async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];
  if (!refreshToken) {
    throw new AppError('Invalid refresh token', 401);
  }

  const { accessToken } = await authService.refreshAccessToken(refreshToken);
  setAccessTokenCookie(res, accessToken);
  sendSuccess(res, null, 'Token refreshed');
});

export const logout = catchAsync(async (req, res) => {
  await authService.logoutUser(req.user!._id);
  clearAuthCookies(res);
  sendSuccess(res, null, 'Logged out successfully');
});
