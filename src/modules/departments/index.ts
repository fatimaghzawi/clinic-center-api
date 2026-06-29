import departmentRoutes from './routes/department.routes';

export default departmentRoutes;
export { departmentRoutes };
export * from './controllers/department.controller';
export * from './services/department.service';
export * from './validations/department.validation';
export { default as Department } from './models/department.model';
