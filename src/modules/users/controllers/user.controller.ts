import { getParamId } from '../../../shared/utils/helpers';
import { catchAsync } from '../../../shared/utils/catchAsync';
import { sendSuccess, sendPaginated } from '../../../shared/utils/response';
import { parsePagination, buildPaginationMeta } from '../../../shared/utils/pagination';
import type { UserRole } from '../../../shared/constants/roles';
import * as userService from '../services/user.service';

export const getAll = catchAsync(async (req, res) => {
  const { skip, limit, sort, page } = parsePagination(req.query);
  const { data, total } = await userService.getUsers({
    skip,
    limit,
    sort,
    search: req.query.search as string | undefined,
    role: req.query.role as UserRole | undefined,
  });
  sendPaginated(res, data, buildPaginationMeta(total, page, limit));
});

export const getById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(getParamId(req.params.id));
  sendSuccess(res, user);
});

export const update = catchAsync(async (req, res) => {
  const user = await userService.updateUser(getParamId(req.params.id), req.body, req.user!._id);
  sendSuccess(res, user, 'User updated');
});

export const remove = catchAsync(async (req, res) => {
  await userService.deleteUser(getParamId(req.params.id), req.user!._id);
  res.status(204).send();
});
