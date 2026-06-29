export const USER_ROLES = ['receptionist', 'doctor', 'nurse', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const STAFF_TYPES = ['doctor', 'nurse'] as const;
export type StaffType = (typeof STAFF_TYPES)[number];
