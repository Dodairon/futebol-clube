import { Router } from 'express';
import loginController from '../controllers/login';
import middleLogin from '../middlewares/login';
import loginValidate from '../controllers/validateLogin';

const router = Router();

router.post('/login', middleLogin, loginController);
router.get('/login/validate', loginValidate);

export default router;
