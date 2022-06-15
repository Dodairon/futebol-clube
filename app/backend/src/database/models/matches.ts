import { Model, DataTypes } from 'sequelize';
import db from '.';

class Matches extends Model {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Matches.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default Matches;
