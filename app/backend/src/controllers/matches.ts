import { RequestHandler } from 'express';
import {
  allMatches,
  saveMatch,
  falseMatch,
  scoreMatch,
} from '../Services/matches';

export const getAllMatches: RequestHandler = async (req, res) => {
  const { inProgress } = req.query;
  const matches = await allMatches(inProgress as string);
  return res.status(200).json(matches);
};

export const postSaveMatch: RequestHandler = async (req, res) => {
  const match = await saveMatch(req.body);
  return res.status(201).json(match);
};

export const postFalseMatch: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await falseMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

export const patchScoreMatch: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { homeTeamGoals } = req.body;
  try {
    if (homeTeamGoals) {
      await scoreMatch(Number(id), req.body);
      return res.status(200).json({ message: 'Score updated' });
    }
    await falseMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};
