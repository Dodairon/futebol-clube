import { RequestHandler } from 'express';
import { allTeams, teamsById } from '../Services/teams';

export const getAllTeams: RequestHandler = async (_req, res) => {
  const teams = await allTeams();
  res.status(200).json(teams);
};

export const getTeamById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const team = await teamsById(Number(id));
  res.status(200).send(team);
};
