import { Router } from 'express';
import * as departmentController from '../controllers/department.controller';
import { authenticate } from '../../../shared/middleware/authenticate';
import { restrictTo } from '../../../shared/middleware/authorize';
import { validate } from '../../../shared/middleware/validate';
import { createDepartmentSchema, updateDepartmentSchema } from '../validations/department.validation';
import { paginationQuerySchema } from '../../../shared/validations/pagination.validation';

const router = Router();
router.use(authenticate);

router.post('/', restrictTo('admin'), validate(createDepartmentSchema), departmentController.create);
router.get('/', validate(paginationQuerySchema, 'query'), departmentController.getAll);
router.get('/:id', departmentController.getById);
router.patch('/:id', restrictTo('admin'), validate(updateDepartmentSchema), departmentController.update);
router.delete('/:id', restrictTo('admin'), departmentController.remove);

export default router;
