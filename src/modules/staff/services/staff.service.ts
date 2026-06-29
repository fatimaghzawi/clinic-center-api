import type { Types } from 'mongoose';
import { AppError } from '../../../shared/utils/AppError';
import type { PaginatedResult } from '../../../shared/interfaces/Pagination';
import type { StaffType } from '../../../shared/constants/roles';
import type { CreateStaffInput, UpdateStaffInput } from '../validations/staff.validation';
import * as staffRepository from '../repositories/staff.repository';
import * as authRepository from '../../auth/repositories/auth.repository';

export interface GetStaffParams {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  search?: string;
  staffType?: StaffType;
  departmentId?: string;
}

export const createStaff = async (data: CreateStaffInput, userId: Types.ObjectId) => {
  const user = await authRepository.findById(data.userId);
  if (!user) throw new AppError('User not found', 404);
  if (!['doctor', 'nurse'].includes(data.staffType)) throw new AppError('Invalid staff type', 400);
  if (user.role !== data.staffType) throw new AppError('User role must match staff type', 422);

  return staffRepository.create(data, userId);
};

export const getStaff = async (params: GetStaffParams): Promise<PaginatedResult<Record<string, unknown>>> => {
  return staffRepository.findMany(params);
};

export const getStaffById = async (id: string) => {
  const staff = await staffRepository.findById(id);
  if (!staff) throw new AppError('Staff profile not found', 404);
  return staff;
};

export const updateStaff = async (id: string, data: UpdateStaffInput, userId: Types.ObjectId) => {
  const staff = await staffRepository.updateById(id, data, userId);
  if (!staff) throw new AppError('Staff profile not found', 404);
  return staff;
};

export const deleteStaff = async (id: string, userId: Types.ObjectId) => {
  const staff = await staffRepository.findDocumentById(id);
  if (!staff) throw new AppError('Staff profile not found', 404);
  await staff.softDelete(userId);
};

export const getDoctorsByDepartment = async (departmentId: string) => {
  return staffRepository.findDoctorsByDepartment(departmentId);
};
