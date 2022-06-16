import { Router } from 'express';
import loginController from '../controllers/login';
import middleLogin from '../middlewares/login';

const router = Router();

router.post('/login', middleLogin, loginController);

export default router;
