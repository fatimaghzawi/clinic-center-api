import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticate } from '../../../shared/middleware/authenticate';
import { restrictTo } from '../../../shared/middleware/authorize';
import { validate } from '../../../shared/middleware/validate';
import { registerSchema, loginSchema } from '../validations/auth.validation';

const router = Router();

router.post('/register', authenticate, restrictTo('admin'), validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authenticate, authController.logout);

export default router;
