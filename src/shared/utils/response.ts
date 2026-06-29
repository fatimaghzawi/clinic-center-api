import type { Response } from 'express';
import type { PaginationMeta } from '../interfaces/Pagination';

export const sendSuccess = <T>(res: Response, data: T, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendPaginated = <T>(res: Response, data: T[], pagination: PaginationMeta, message = 'Success') => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
};

export const sendError = (res: Response, message: string, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};
