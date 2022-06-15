import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matches from './matches';

class Teams extends Model {
  id: number;
  teamName: string;
}

Teams.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });
Teams.hasMany(Matches, { foreignKey: 'id', as: 'teamId' });

export default Teams;
