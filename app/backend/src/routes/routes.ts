import { Router } from 'express';
import loginController from '../controllers/login';
import middleLogin from '../middlewares/login';
import loginValidate from '../controllers/validateLogin';
import { getAllTeams, getTeamById } from '../controllers/teams';
import {
  getAllMatches,
  postFalseMatch,
  postSaveMatch,
  patchScoreMatch,
} from '../controllers/matches';
import { equalTeams, invalidTeam } from '../middlewares/matches';

const router = Router();

router.post('/login', middleLogin, loginController);
router.get('/login/validate', loginValidate);
router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.get('/matches', getAllMatches);
router.post('/matches', equalTeams, invalidTeam, postSaveMatch);
router.patch('/matches/:id/Finish', postFalseMatch);
router.patch('/matches/:id', patchScoreMatch);

export default router;
