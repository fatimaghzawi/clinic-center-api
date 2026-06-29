import mongoose, { type Schema } from 'mongoose';
import type { Types } from 'mongoose';

export const auditFields = {
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: { type: Date, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
};

export const applySoftDeleteFilter = (schema: Schema) => {
  schema.pre(/^find/, function (this: mongoose.Query<unknown, unknown>) {
    if (this.getOptions().includeDeleted) return;
    this.where({ isDeleted: { $ne: true } });
  });
};

export const softDelete = async function (this: mongoose.Document, userId?: Types.ObjectId) {
  this.set('isDeleted', true);
  this.set('deletedAt', new Date());
  if (userId) this.set('updatedBy', userId);
  return this.save();
};
