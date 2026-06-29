import type { FilterQuery, Types } from 'mongoose';
import StaffProfile, { type IStaffProfileDocument } from '../models/staff.model';
import type { CreateStaffInput, UpdateStaffInput } from '../validations/staff.validation';
import type { StaffType } from '../../../shared/constants/roles';

interface FindStaffParams {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  search?: string;
  staffType?: StaffType;
  departmentId?: string;
}

export const create = (data: CreateStaffInput, userId: Types.ObjectId) =>
  StaffProfile.create({ ...data, createdBy: userId });

export const findMany = async ({ skip, limit, sort, search, staffType, departmentId }: FindStaffParams) => {
  const filter: FilterQuery<IStaffProfileDocument> = {};
  if (staffType) filter.staffType = staffType;
  if (departmentId) filter.departmentId = departmentId;
  if (search) filter.$text = { $search: search };

  const [data, total] = await Promise.all([
    StaffProfile.find(filter)
      .populate('departmentId', 'departmentName')
      .populate('userId', 'username role')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    StaffProfile.countDocuments(filter),
  ]);
  return { data, total };
};

export const findById = (id: string) =>
  StaffProfile.findById(id)
    .populate('departmentId', 'departmentName')
    .populate('userId', 'username role')
    .lean();

export const findDocumentById = (id: string) => StaffProfile.findById(id);

export const updateById = (id: string, data: UpdateStaffInput, userId: Types.ObjectId) =>
  StaffProfile.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true, runValidators: true });

export const findDoctorsByDepartment = (departmentId: string) =>
  StaffProfile.find({ departmentId, staffType: 'doctor' })
    .select('fullName specialization email phone')
    .lean();

export const softDeleteByUserId = (userId: string, updatedBy: Types.ObjectId) =>
  StaffProfile.findOneAndUpdate(
    { userId },
    { isDeleted: true, deletedAt: new Date(), updatedBy }
  );
