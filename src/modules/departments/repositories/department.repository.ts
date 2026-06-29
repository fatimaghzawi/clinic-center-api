import type { Types } from 'mongoose';
import Department from '../models/department.model';
import type { CreateDepartmentInput, UpdateDepartmentInput } from '../validations/department.validation';

interface FindDepartmentsParams {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  search?: string;
}

export const create = (data: CreateDepartmentInput, userId: Types.ObjectId) =>
  Department.create({ ...data, createdBy: userId });

export const findMany = async ({ skip, limit, sort, search }: FindDepartmentsParams) => {
  const filter: Record<string, unknown> = {};
  if (search) filter.$text = { $search: search };

  const [data, total] = await Promise.all([
    Department.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Department.countDocuments(filter),
  ]);
  return { data, total };
};

export const findById = (id: string) => Department.findById(id).lean();

export const findDocumentById = (id: string) => Department.findById(id);

export const updateById = (id: string, data: UpdateDepartmentInput, userId: Types.ObjectId) =>
  Department.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true, runValidators: true });
