import {Router} from 'express';
import UserController from '../controllers/userController';
import { authenticate } from '../middlewares';

const userRoutes = Router();

userRoutes.post('/', UserController.storeUser);
userRoutes.get('/:id', authenticate, UserController.showUser);
userRoutes.delete('/:id', authenticate, UserController.deleteUser);
userRoutes.put('/:id', authenticate, UserController.updateUser);

export default userRoutes;
