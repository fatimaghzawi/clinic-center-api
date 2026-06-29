import type { Types } from 'mongoose';
import { AppError } from '../../../shared/utils/AppError';
import type { PaginatedResult } from '../../../shared/interfaces/Pagination';
import type { CreateDepartmentInput, UpdateDepartmentInput } from '../validations/department.validation';
import * as departmentRepository from '../repositories/department.repository';

interface GetDepartmentsParams {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  search?: string;
}

export const createDepartment = async (data: CreateDepartmentInput, userId: Types.ObjectId) => {
  return departmentRepository.create(data, userId);
};

export const getDepartments = async (
  params: GetDepartmentsParams
): Promise<PaginatedResult<Record<string, unknown>>> => {
  return departmentRepository.findMany(params);
};

export const getDepartmentById = async (id: string) => {
  const dept = await departmentRepository.findById(id);
  if (!dept) throw new AppError('Department not found', 404);
  return dept;
};

export const updateDepartment = async (id: string, data: UpdateDepartmentInput, userId: Types.ObjectId) => {
  const dept = await departmentRepository.updateById(id, data, userId);
  if (!dept) throw new AppError('Department not found', 404);
  return dept;
};

export const deleteDepartment = async (id: string, userId: Types.ObjectId) => {
  const dept = await departmentRepository.findDocumentById(id);
  if (!dept) throw new AppError('Department not found', 404);
  await dept.softDelete(userId);
};
