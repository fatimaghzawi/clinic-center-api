import { Router } from 'express';
import authRoutes from '../modules/auth';
import userRoutes from '../modules/users';
import departmentRoutes from '../modules/departments';
import staffRoutes from '../modules/staff';
import patientRoutes from '../modules/patients';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/departments', departmentRoutes);
router.use('/staff', staffRoutes);
router.use('/patients', patientRoutes);

export default router;
