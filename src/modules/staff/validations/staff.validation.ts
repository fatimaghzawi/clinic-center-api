import { z } from 'zod';
import { objectIdSchema } from '../../../shared/validations/common.validation';
import { STAFF_TYPES } from '../../../shared/constants/roles';

export const createStaffSchema = z.object({
  userId: objectIdSchema,
  departmentId: objectIdSchema,
  staffType: z.enum(STAFF_TYPES),
  fullName: z.string().min(1).max(100),
  specialization: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().max(100).optional(),
  gender: z.enum(['Male', 'Female']).optional(),
});

export const updateStaffSchema = createStaffSchema.omit({ userId: true }).partial();

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;
