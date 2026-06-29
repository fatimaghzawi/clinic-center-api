import type { Types } from 'mongoose';

export interface IAuditFields {
  isDeleted: boolean;
  deletedAt: Date | null;
  createdBy?: Types.ObjectId | null;
  updatedBy?: Types.ObjectId | null;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface PaginationParams {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  page: number;
}
