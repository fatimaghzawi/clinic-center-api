import mongoose, { type Document, type Model, type Types } from 'mongoose';
import { auditFields, applySoftDeleteFilter, softDelete } from '../../../shared/utils/auditPlugin';
import type { IAuditFields } from '../../../shared/interfaces/Pagination';
import type { StaffType } from '../../../shared/constants/roles';

export type Gender = 'Male' | 'Female';

export interface IStaffProfile extends IAuditFields {
  userId: Types.ObjectId;
  departmentId: Types.ObjectId;
  staffType: StaffType;
  fullName: string;
  specialization?: string;
  phone?: string;
  email?: string;
  gender?: Gender;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStaffProfileDocument extends IStaffProfile, Document {
  softDelete(userId?: Types.ObjectId): Promise<this>;
}

interface IStaffProfileModel extends Model<IStaffProfileDocument> {}

const staffProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    staffType: {
      type: String,
      enum: ['doctor', 'nurse'],
      required: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 100,
    },
    specialization: { type: String, trim: true, maxlength: 100 },
    phone: { type: String, trim: true, maxlength: 20 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 100,
    },
    gender: { type: String, enum: ['Male', 'Female'] },
    ...auditFields,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

staffProfileSchema.index({ departmentId: 1, staffType: 1 });
staffProfileSchema.index({ email: 1 }, { unique: true, sparse: true, partialFilterExpression: { isDeleted: false } });
staffProfileSchema.index({ fullName: 'text', specialization: 'text' });
applySoftDeleteFilter(staffProfileSchema);
staffProfileSchema.methods.softDelete = softDelete as never;

staffProfileSchema.virtual('department', {
  ref: 'Department',
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true,
});

const StaffProfile = mongoose.model<IStaffProfileDocument, IStaffProfileModel>('StaffProfile', staffProfileSchema);
export default StaffProfile;
