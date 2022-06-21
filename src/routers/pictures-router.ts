import { Router } from 'express';
import {
  getPictures,
  createPicture,
  updatePicture,
  deletePicture,
} from '../controllers/pictures-controller';
import { authMiddleware } from '../middlewares/auth-middlewares';

const picturesRouter = Router();

picturesRouter.get('/', getPictures);
picturesRouter.post('/', authMiddleware, createPicture);
picturesRouter.patch('/:id', authMiddleware, updatePicture);
picturesRouter.delete('/:id', authMiddleware, deletePicture);

export default picturesRouter;
