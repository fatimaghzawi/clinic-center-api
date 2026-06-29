import { z } from 'zod';
import { USER_ROLES } from '../../../shared/constants/roles';
import { passwordSchema } from '../../../shared/validations/password.validation';

export const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  username: z.string().min(3).max(50),
  password: passwordSchema,
  role: z.enum(USER_ROLES),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
