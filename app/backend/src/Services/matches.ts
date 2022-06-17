import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

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

export async function gedsfsdfdsfhes() {
  const include = [
    { model: Teams, as: 'homeTeam' },
    { model: Teams, as: 'awayTeam' },
  ];
  return include;
}
