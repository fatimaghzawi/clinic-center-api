import type { PaginationMeta } from './Pagination';

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiPaginatedResponse<T> {
  success: true;
  message: string;
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  stack?: string;
}
