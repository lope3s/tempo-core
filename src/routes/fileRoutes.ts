import {Router} from "express";
import FileController from '../controllers/fileController';
import multerConfig from "../config/multer";
import multer from 'multer';
import { authenticate } from "../middlewares";

const fileRoutes = Router();

const upload = multer(multerConfig)

fileRoutes.post('/', authenticate, upload.array('files'), FileController.storeFile);
fileRoutes.delete('/:fileId', authenticate, FileController.deleteFile)

export default fileRoutes;