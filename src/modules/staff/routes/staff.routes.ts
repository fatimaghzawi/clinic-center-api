import { Router } from 'express';
import * as staffController from '../controllers/staff.controller';
import { authenticate } from '../../../shared/middleware/authenticate';
import { restrictTo } from '../../../shared/middleware/authorize';
import { validate } from '../../../shared/middleware/validate';
import { createStaffSchema, updateStaffSchema } from '../validations/staff.validation';
import { paginationQuerySchema } from '../../../shared/validations/pagination.validation';

const router = Router();
router.use(authenticate);

router.post('/', restrictTo('admin'), validate(createStaffSchema), staffController.create);
router.get('/', validate(paginationQuerySchema, 'query'), staffController.getAll);
router.get('/department/:departmentId/doctors', staffController.getByDepartment);
router.get('/:id', staffController.getById);
router.patch('/:id', restrictTo('admin'), validate(updateStaffSchema), staffController.update);
router.delete('/:id', restrictTo('admin'), staffController.remove);

export default router;
