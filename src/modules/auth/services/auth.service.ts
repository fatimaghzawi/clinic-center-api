import type { Types } from 'mongoose';
import { AppError } from '../../../shared/utils/AppError';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../../shared/utils/jwt';
import { hashPassword, hashToken, comparePassword } from '../../../shared/utils/password';
import type { LoginInput, RegisterInput } from '../validations/auth.validation';
import * as authRepository from '../repositories/auth.repository';

export const registerUser = async (data: RegisterInput, createdBy?: Types.ObjectId) => {
  const existing = await authRepository.findByUsername(data.username);
  if (existing) throw new AppError('Username already exists', 409);

  const passwordHash = await hashPassword(data.password);
  return authRepository.createUser({
    username: data.username,
    passwordHash,
    role: data.role,
    createdBy,
  });
};

export const loginUser = async ({ username, password }: LoginInput) => {
  const user = await authRepository.findByUsernameWithSecrets(username);
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid username or password', 401);
  }
  if (!user.isActive) throw new AppError('Account is deactivated', 403);

  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());
  user.refreshTokenHash = await hashToken(refreshToken);
  await authRepository.saveUser(user);

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);
  const user = await authRepository.findByIdWithRefreshToken(decoded.id);
  if (!user?.refreshTokenHash) throw new AppError('Invalid refresh token', 401);

  const valid = await comparePassword(refreshToken, user.refreshTokenHash);
  if (!valid) throw new AppError('Invalid refresh token', 401);

  return { accessToken: signAccessToken(user._id.toString()) };
};

export const logoutUser = async (userId: Types.ObjectId) => {
  await authRepository.clearRefreshToken(userId);
};
