import mongoose, { Schema, type Document, type Model, type Types } from 'mongoose';
import { comparePassword } from '../../../shared/utils/password';
import { auditFields, applySoftDeleteFilter, softDelete } from '../../../shared/utils/auditPlugin';
import type { IAuditFields } from '../../../shared/interfaces/Pagination';
import type { UserRole } from '../../../shared/constants/roles';

export interface IUser {
  username: string;
  passwordHash: string;
  role: UserRole;
  refreshTokenHash?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  softDelete(userId?: Types.ObjectId): Promise<this>;
}

export interface IUserDocument extends Document, IUser, IAuditFields, IUserMethods {}

export type UserModel = Model<IUserDocument, Record<string, never>, IUserMethods>;

const userSchema = new Schema<IUserDocument, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: ['receptionist', 'doctor', 'nurse', 'admin'],
      required: true,
    },
    refreshTokenHash: { type: String, select: false },
    isActive: { type: Boolean, default: true },
    ...auditFields,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.index({ role: 1, isActive: 1 });
applySoftDeleteFilter(userSchema);

userSchema.virtual('staffProfile', {
  ref: 'StaffProfile',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return comparePassword(candidatePassword, this.passwordHash);
};

userSchema.methods.softDelete = softDelete as never;

const User = mongoose.model<IUserDocument, UserModel>('User', userSchema);
export default User;
