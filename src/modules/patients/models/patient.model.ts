import mongoose, { type Document, type Model, type Types } from 'mongoose';
import { auditFields, applySoftDeleteFilter, softDelete } from '../../../shared/utils/auditPlugin';
import type { IAuditFields } from '../../../shared/interfaces/Pagination';

export type Gender = 'Male' | 'Female';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface IPatient extends IAuditFields {
  fullName: string;
  phone: string;
  email?: string;
  gender?: Gender;
  dateOfBirth: Date;
  address: string;
  bloodGroup: BloodGroup;
  emergencyContact: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPatientDocument extends IPatient, Document {
  softDelete(userId?: Types.ObjectId): Promise<this>;
}

interface IPatientModel extends Model<IPatientDocument> {}

const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 100,
    },
    gender: { type: String, enum: ['Male', 'Female'] },
    dateOfBirth: { type: Date, required: [true, 'Date of birth is required'] },
    address: { type: String, required: [true, 'Address is required'], trim: true },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    emergencyContact: {
      type: String,
      required: [true, 'Emergency contact is required'],
      trim: true,
      maxlength: 100,
    },
    ...auditFields,
  },
  { timestamps: true }
);

patientSchema.index({ email: 1 }, { unique: true, sparse: true, partialFilterExpression: { isDeleted: false } });
patientSchema.index({ phone: 1 });
patientSchema.index({ fullName: 'text', phone: 'text', email: 'text' });
applySoftDeleteFilter(patientSchema);
patientSchema.methods.softDelete = softDelete as never;

const Patient = mongoose.model<IPatientDocument, IPatientModel>('Patient', patientSchema);
export default Patient;
