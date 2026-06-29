import type { Types } from 'mongoose';
import type { UserRole } from '../../../shared/constants/roles';
import User from '../../auth/models/user.model';
import type { UpdateUserInput } from '../validations/user.validation';

interface FindUsersParams {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  search?: string;
  role?: UserRole;
}

export const findUsers = async ({ skip, limit, sort, search, role }: FindUsersParams) => {
  const filter: Record<string, unknown> = {};
  if (role) filter.role = role;
  if (search) filter.username = { $regex: search, $options: 'i' };

  const [data, total] = await Promise.all([
    User.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);
  return { data, total };
};

export const findById = (id: string) => User.findById(id).lean();

export const findDocumentById = (id: string) => User.findById(id);

export const updateById = (id: string, data: UpdateUserInput, updatedBy: Types.ObjectId) =>
  User.findByIdAndUpdate(id, { ...data, updatedBy }, { new: true, runValidators: true });
