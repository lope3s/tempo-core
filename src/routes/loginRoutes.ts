import { Router } from "express";
import LoginController from "../controllers/loginController";

const loginRoute = Router();

loginRoute.post('/', LoginController.loginUser);

export default loginRoute;