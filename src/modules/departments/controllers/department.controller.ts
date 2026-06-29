import { getParamId } from '../../../shared/utils/helpers';
import { catchAsync } from '../../../shared/utils/catchAsync';
import { sendSuccess, sendPaginated } from '../../../shared/utils/response';
import { parsePagination, buildPaginationMeta } from '../../../shared/utils/pagination';
import * as departmentService from '../services/department.service';

export const create = catchAsync(async (req, res) => {
  const dept = await departmentService.createDepartment(req.body, req.user!._id);
  sendSuccess(res, dept, 'Department created', 201);
});

export const getAll = catchAsync(async (req, res) => {
  const { skip, limit, sort, page } = parsePagination(req.query);
  const { data, total } = await departmentService.getDepartments({
    skip,
    limit,
    sort,
    search: req.query.search as string | undefined,
  });
  sendPaginated(res, data, buildPaginationMeta(total, page, limit));
});

export const getById = catchAsync(async (req, res) => {
  sendSuccess(res, await departmentService.getDepartmentById(getParamId(req.params.id)));
});

export const update = catchAsync(async (req, res) => {
  sendSuccess(
    res,
    await departmentService.updateDepartment(getParamId(req.params.id), req.body, req.user!._id),
    'Department updated'
  );
});

export const remove = catchAsync(async (req, res) => {
  await departmentService.deleteDepartment(getParamId(req.params.id), req.user!._id);
  res.status(204).send();
});
