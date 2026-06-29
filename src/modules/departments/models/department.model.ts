import mongoose, { Schema, type Document, type Model, type Types } from 'mongoose';
import { auditFields, applySoftDeleteFilter, softDelete } from '../../../shared/utils/auditPlugin';
import type { IAuditFields } from '../../../shared/interfaces/Pagination';

export interface IDepartment {
  departmentName: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDepartmentMethods {
  softDelete(userId?: Types.ObjectId): Promise<this>;
}

export interface IDepartmentDocument extends Document, IDepartment, IAuditFields, IDepartmentMethods {}

export type DepartmentModel = Model<IDepartmentDocument, Record<string, never>, IDepartmentMethods>;

const departmentSchema = new Schema<IDepartmentDocument, DepartmentModel, IDepartmentMethods>(
  {
    departmentName: {
      type: String,
      required: [true, 'Department name is required'],
      trim: true,
      maxlength: 100,
    },
    description: { type: String, trim: true },
    ...auditFields,
  },
  { timestamps: true }
);

departmentSchema.index({ departmentName: 1 }, { unique: true, partialFilterExpression: { isDeleted: false } });
applySoftDeleteFilter(departmentSchema);
departmentSchema.methods.softDelete = softDelete as never;

const Department = mongoose.model<IDepartmentDocument, DepartmentModel>('Department', departmentSchema);
export default Department;
