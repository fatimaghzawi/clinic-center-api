import type { Types } from 'mongoose';
import User, { type IUserDocument } from '../models/user.model';
import type { UserRole } from '../../../shared/constants/roles';

export const findByUsername = (username: string) => User.findOne({ username });

export const findByUsernameWithSecrets = (username: string) =>
  User.findOne({ username }).select('+passwordHash +refreshTokenHash');

export const createUser = (data: {
  username: string;
  passwordHash: string;
  role: UserRole;
  createdBy?: Types.ObjectId;
}) => User.create(data);

export const findById = (id: string) => User.findById(id);

export const findByIdWithRefreshToken = (id: string) =>
  User.findById(id).select('+refreshTokenHash');

export const saveUser = (user: IUserDocument) => user.save({ validateBeforeSave: false });

export const clearRefreshToken = (userId: Types.ObjectId) =>
  User.findByIdAndUpdate(userId, { refreshTokenHash: null });
