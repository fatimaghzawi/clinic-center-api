import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../../../shared/middleware/authenticate';
import { restrictTo } from '../../../shared/middleware/authorize';
import { validate } from '../../../shared/middleware/validate';
import { updateUserSchema } from '../validations/user.validation';
import { paginationQuerySchema } from '../../../shared/validations/pagination.validation';

const router = Router();

router.use(authenticate, restrictTo('admin'));

router.get('/', validate(paginationQuerySchema, 'query'), userController.getAll);
router.get('/:id', userController.getById);
router.patch('/:id', validate(updateUserSchema), userController.update);
router.delete('/:id', userController.remove);

export default router;
