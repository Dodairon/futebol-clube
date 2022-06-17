import Teams from '../database/models/teams';

export const allTeams = async () => {
  const teams = await Teams.findAll();
  return teams;
};

export const teamsById = async (id: number) => {
  const team = await Teams.findByPk(id);
  return team;
};
