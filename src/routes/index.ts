import express, {Router} from 'express';
import userRoutes from './userRoutes';
import fileRoutes from './fileRoutes';
import loginRoute from './loginRoutes';
import swaggerUi from  'swagger-ui-express';
import swaggerDocument from '../config/swagger.json';

const routes = Router();

if (process.env.NODE_ENV === 'dev') {
    routes.use('/uploads', express.static('src/uploads/'))
}

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.use('/users', userRoutes);
routes.use('/files', fileRoutes);
routes.use('/login', loginRoute);

export default routes;
