import { Router } from 'express';
import loginController from '../controllers/login';
import middleLogin from '../middlewares/login';
import loginValidate from '../controllers/validateLogin';
import { getAllTeams, getTeamById } from '../controllers/teams';
import getAllMatches from '../controllers/matches';

const router = Router();

router.post('/login', middleLogin, loginController);
router.get('/login/validate', loginValidate);
router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.get('/matches', getAllMatches);

export default router;
