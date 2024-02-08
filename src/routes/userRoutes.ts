import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/', UserController.index);
router.post('/', UserController.store);
router.delete('/delete/:id?', authMiddleware, UserController.delete);
router.put('/edit/:id?', authMiddleware, UserController.update);

export default router;
