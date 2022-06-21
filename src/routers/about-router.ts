import { Router } from 'express';
import {
    getAbout,
    updateAbout,
    createAbout,
} from '../controllers/about-controller';
import { authMiddleware } from '../middlewares/auth-middlewares';

const aboutRouter = Router();

aboutRouter.get('/', getAbout);
aboutRouter.patch('/:id', authMiddleware, updateAbout);
aboutRouter.post('/', authMiddleware, createAbout);

export default aboutRouter;
