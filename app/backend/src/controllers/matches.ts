import { RequestHandler } from 'express';
import { allMatches } from '../Services/matches';

const getAllMatches: RequestHandler = async (req, res) => {
  const { inProgress } = req.query;
  const matches = await allMatches(inProgress as string);
  return res.status(200).json(matches);
};

export default getAllMatches;
