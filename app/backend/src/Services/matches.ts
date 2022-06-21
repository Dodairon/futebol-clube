import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import MatchesInterface from '../InterfaceMatch';
import Score from '../InterfaceScore';

export async function allMatches(inProgress: string) {
  const include = [
    { model: Teams, as: 'teamHome' },
    { model: Teams, as: 'teamAway' },
  ];
  if (inProgress === undefined) {
    return Matches.findAll({ include });
  }
  const matches = await Matches.findAll({
    include,
    where: { inProgress: inProgress === 'true' },
  });
  return matches;
}

export async function saveMatch(match: MatchesInterface) {
  const matchSaved = await Matches.create(match);
  return matchSaved;
}

export async function falseMatch(id: number) {
  const match = await Matches.findByPk(id);
  if (!match) {
    throw new Error('Match not found');
  }
  await match.update({ inProgress: false });
}

export function scoreMatch(id: number, score: Score) {
  Matches.update(score, { where: { id } });
}
