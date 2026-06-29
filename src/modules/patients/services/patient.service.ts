import type { FilterQuery, Types } from 'mongoose';
import { AppError } from '../../../shared/utils/AppError';
import type { PaginatedResult } from '../../../shared/interfaces/Pagination';
import type { IPatientDocument } from '../models/patient.model';
import type { CreatePatientInput, UpdatePatientInput } from '../validations/patient.validation';
import * as patientRepository from '../repositories/patient.repository';

export interface GetPatientsParams {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  search?: string;
}

export const createPatient = async (data: CreatePatientInput, userId: Types.ObjectId) => {
  return patientRepository.create({ ...data, createdBy: userId });
};

export const getPatients = async ({
  skip,
  limit,
  sort,
  search,
}: GetPatientsParams): Promise<PaginatedResult<Record<string, unknown>>> => {
  const filter: FilterQuery<IPatientDocument> = {};
  if (search) filter.$text = { $search: search };

  const [data, total] = await Promise.all([
    patientRepository.findMany(filter, sort, skip, limit),
    patientRepository.count(filter),
  ]);
  return { data, total };
};

export const getPatientById = async (id: string) => {
  const patient = await patientRepository.findByIdLean(id);
  if (!patient) throw new AppError('Patient not found', 404);
  return patient;
};

export const updatePatient = async (id: string, data: UpdatePatientInput, userId: Types.ObjectId) => {
  const patient = await patientRepository.findByIdAndUpdate(id, { ...data, updatedBy: userId });
  if (!patient) throw new AppError('Patient not found', 404);
  return patient;
};

export const deletePatient = async (id: string, userId: Types.ObjectId) => {
  const patient = await patientRepository.findById(id);
  if (!patient) throw new AppError('Patient not found', 404);
  await patient.softDelete(userId);
};
