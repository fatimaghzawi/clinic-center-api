import { Router } from 'express';
import * as patientController from '../controllers/patient.controller';
import { authenticate } from '../../../shared/middleware/authenticate';
import { restrictTo } from '../../../shared/middleware/authorize';
import { validate } from '../../../shared/middleware/validate';
import { createPatientSchema, updatePatientSchema } from '../validations/patient.validation';
import { paginationQuerySchema } from '../../../shared/validations/pagination.validation';

const router = Router();
router.use(authenticate);

router.post('/', restrictTo('admin', 'receptionist'), validate(createPatientSchema), patientController.create);
router.get('/', validate(paginationQuerySchema, 'query'), patientController.getAll);
router.get('/:id', patientController.getById);
router.patch('/:id', restrictTo('admin', 'receptionist', 'doctor', 'nurse'), validate(updatePatientSchema), patientController.update);
router.delete('/:id', restrictTo('admin'), patientController.remove);

export default router;
