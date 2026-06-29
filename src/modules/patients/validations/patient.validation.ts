import { z } from 'zod';

export const createPatientSchema = z.object({
  fullName: z.string().min(1).max(100),
  phone: z.string().min(1).max(20),
  email: z.string().email().max(100).optional(),
  gender: z.enum(['Male', 'Female']).optional(),
  dateOfBirth: z.coerce.date(),
  address: z.string().min(1),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  emergencyContact: z.string().min(1).max(100),
});

export const updatePatientSchema = createPatientSchema.partial();

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
