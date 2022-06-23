import Match from '../database/models/matches';
import Team from '../database/models/teams';
import Leader from '../InterfaceLeaderboard';

function homePoints(match: Match, leader: Leader) {
  const lead = leader;
  if (match.homeTeamGoals > match.awayTeamGoals) {
    lead.totalPoints += 3;
    lead.totalVictories += 1;
  }
  if (match.homeTeamGoals === match.awayTeamGoals) {
    lead.totalPoints += 1;
    lead.totalDraws += 1;
  }
  if (match.homeTeamGoals < match.awayTeamGoals) lead.totalLosses += 1;
  lead.goalsFavor += match.homeTeamGoals;
  lead.goalsOwn += match.awayTeamGoals;

  lead.totalGames += 1;
  return lead;
}
function teamsInfos(team: Team, matches: Match[]) {
  let leader = { name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0 };
  leader.name = team.teamName;
  matches
    .filter((match) => (match.homeTeam === team.id) && !match.inProgress)
    .forEach((match) => { leader = homePoints(match, leader); });
  leader.goalsBalance = leader.goalsFavor - leader.goalsOwn;
  leader.efficiency = (leader.totalPoints / (leader.totalGames * 3)) * 100;
  leader.efficiency = Number(leader.efficiency.toFixed(2));
  return leader;
}

const homeLeader = (teams: Team[], matches: Match[]) => teams
  .map((team) => teamsInfos(team, matches))
  .sort((a, b) =>
    b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn);

const homeLeaderBoard = async () => {
  const matches = await Match.findAll();
  const teams = await Team.findAll();
  const board = homeLeader(teams, matches);
  return board;
};

export default homeLeaderBoard;
