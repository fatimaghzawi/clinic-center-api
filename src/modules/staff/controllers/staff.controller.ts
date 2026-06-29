import type { Request, Response } from 'express';
import { getParamId } from '../../../shared/utils/helpers';
import { catchAsync } from '../../../shared/utils/catchAsync';
import { sendSuccess, sendPaginated } from '../../../shared/utils/response';
import { parsePagination, buildPaginationMeta } from '../../../shared/utils/pagination';
import type { StaffType } from '../../../shared/constants/roles';
import * as staffService from '../services/staff.service';

export const create = catchAsync(async (req: Request, res: Response) => {
  sendSuccess(res, await staffService.createStaff(req.body, req.user!._id), 'Staff profile created', 201);
});

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const { skip, limit, sort, page } = parsePagination(req.query);
  const { data, total } = await staffService.getStaff({
    skip,
    limit,
    sort,
    search: req.query.search as string | undefined,
    staffType: req.query.staffType as StaffType | undefined,
    departmentId: req.query.departmentId as string | undefined,
  });
  sendPaginated(res, data, buildPaginationMeta(total, page, limit));
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  sendSuccess(res, await staffService.getStaffById(getParamId(req.params.id)));
});

export const update = catchAsync(async (req: Request, res: Response) => {
  sendSuccess(
    res,
    await staffService.updateStaff(getParamId(req.params.id), req.body, req.user!._id),
    'Staff updated'
  );
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await staffService.deleteStaff(getParamId(req.params.id), req.user!._id);
  res.status(204).send();
});

export const getByDepartment = catchAsync(async (req: Request, res: Response) => {
  sendSuccess(res, await staffService.getDoctorsByDepartment(getParamId(req.params.departmentId)));
});
