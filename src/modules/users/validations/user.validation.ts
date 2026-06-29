import { z } from 'zod';
import { USER_ROLES } from '../../../shared/constants/roles';
import { registerSchema } from '../../auth/validations/auth.validation';

export const createUserSchema = registerSchema;

export const updateUserSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  role: z.enum(USER_ROLES).optional(),
  isActive: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
