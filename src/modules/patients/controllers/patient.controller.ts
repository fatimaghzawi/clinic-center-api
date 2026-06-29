import type { Request, Response } from 'express';
import { getParamId } from '../../../shared/utils/helpers';
import { catchAsync } from '../../../shared/utils/catchAsync';
import { sendSuccess, sendPaginated } from '../../../shared/utils/response';
import { parsePagination, buildPaginationMeta } from '../../../shared/utils/pagination';
import * as patientService from '../services/patient.service';

export const create = catchAsync(async (req: Request, res: Response) => {
  sendSuccess(res, await patientService.createPatient(req.body, req.user!._id), 'Patient created', 201);
});

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const { skip, limit, sort, page } = parsePagination(req.query);
  const { data, total } = await patientService.getPatients({ skip, limit, sort, search: req.query.search as string | undefined });
  sendPaginated(res, data, buildPaginationMeta(total, page, limit));
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  sendSuccess(res, await patientService.getPatientById(getParamId(req.params.id)));
});

export const update = catchAsync(async (req: Request, res: Response) => {
  sendSuccess(res, await patientService.updatePatient(getParamId(req.params.id), req.body, req.user!._id), 'Patient updated');
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await patientService.deletePatient(getParamId(req.params.id), req.user!._id);
  res.status(204).send();
});
