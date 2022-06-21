import { Router } from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects-controller';
import { authMiddleware } from '../middlewares/auth-middlewares';

const projectsRouter = Router();

projectsRouter.get('/', getProjects);
projectsRouter.post('/', authMiddleware, createProject);
projectsRouter.patch('/:id', authMiddleware, updateProject);
projectsRouter.delete('/:id', authMiddleware, deleteProject);

export default projectsRouter;
