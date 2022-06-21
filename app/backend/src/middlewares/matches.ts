import { RequestHandler } from 'express';
import Teams from '../database/models/teams';

export const equalTeams: RequestHandler = (req, res, next) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  return next();
};

export const invalidTeam: RequestHandler = async (req, res, next) => {
  const { homeTeam, awayTeam } = req.body;
  const hometeams = await Teams.findByPk(homeTeam);
  const awayteams = await Teams.findByPk(awayTeam);
  if (!hometeams || !awayteams) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return next();
};
