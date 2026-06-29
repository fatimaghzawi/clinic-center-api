import type { Types } from 'mongoose';
import { AppError } from '../../../shared/utils/AppError';
import type { PaginatedResult } from '../../../shared/interfaces/Pagination';
import type { UserRole } from '../../../shared/constants/roles';
import type { UpdateUserInput } from '../validations/user.validation';
import * as userRepository from '../repositories/user.repository';
import * as staffRepository from '../../staff/repositories/staff.repository';

interface GetUsersParams {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  search?: string;
  role?: UserRole;
}

export const getUsers = async (params: GetUsersParams): Promise<PaginatedResult<Record<string, unknown>>> => {
  return userRepository.findUsers(params);
};

export const getUserById = async (id: string) => {
  const user = await userRepository.findById(id);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updateUser = async (id: string, data: UpdateUserInput, updatedBy: Types.ObjectId) => {
  const user = await userRepository.updateById(id, data, updatedBy);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const deleteUser = async (id: string, updatedBy: Types.ObjectId) => {
  const user = await userRepository.findDocumentById(id);
  if (!user) throw new AppError('User not found', 404);
  await user.softDelete(updatedBy);
  await staffRepository.softDeleteByUserId(id, updatedBy);
  return null;
};
