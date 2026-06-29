import type { FilterQuery } from 'mongoose';
import Patient, { type IPatientDocument } from '../models/patient.model';

export const create = (data: Record<string, unknown>) => Patient.create(data);

export const findMany = (
  filter: FilterQuery<IPatientDocument>,
  sort: Record<string, 1 | -1>,
  skip: number,
  limit: number
) => Patient.find(filter).sort(sort).skip(skip).limit(limit).lean();

export const count = (filter: FilterQuery<IPatientDocument>) => Patient.countDocuments(filter);

export const findByIdLean = (id: string) => Patient.findById(id).lean();

export const findById = (id: string) => Patient.findById(id);

export const findByIdAndUpdate = (id: string, payload: Record<string, unknown>) =>
  Patient.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
