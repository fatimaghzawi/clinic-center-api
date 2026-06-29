import type { ParsedQs } from 'qs';
import type { PaginationMeta } from '../interfaces/Pagination';

export const parsePagination = (query: ParsedQs) => {
  const page = Math.max(1, parseInt(String(query.page ?? '1'), 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(String(query.limit ?? '10'), 10) || 10));
  const skip = (page - 1) * limit;
  const sortBy = String(query.sortBy ?? 'createdAt');
  const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
  return { page, limit, skip, sort: { [sortBy]: sortOrder } as Record<string, 1 | -1> };
};

export const buildPaginationMeta = (total: number, page: number, limit: number): PaginationMeta => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit) || 1,
  hasNextPage: page * limit < total,
  hasPrevPage: page > 1,
});
