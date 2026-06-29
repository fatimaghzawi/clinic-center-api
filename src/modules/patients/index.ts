import patientRoutes from './routes/patient.routes';

export default patientRoutes;
export { patientRoutes };
export * from './controllers/patient.controller';
export * from './services/patient.service';
export * from './validations/patient.validation';
export { default as Patient } from './models/patient.model';
