import authRoutes from './routes/auth.routes';

export default authRoutes;
export { authRoutes };
export * from './controllers/auth.controller';
export * from './services/auth.service';
export * from './validations/auth.validation';
export { default as User } from './models/user.model';
