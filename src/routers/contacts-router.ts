import { Router } from 'express';
import {
    getContacts,
    updateContacts,
    createContacts,
} from '../controllers/contacts-controller';
import { authMiddleware } from '../middlewares/auth-middlewares';

const contactsRouter = Router();

contactsRouter.get('/', getContacts);
contactsRouter.patch('/:id', authMiddleware, updateContacts);
contactsRouter.post('/', authMiddleware, createContacts);

export default contactsRouter;
