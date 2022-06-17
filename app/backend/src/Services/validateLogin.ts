import * as jwt from 'jsonwebtoken';
import Users from '../database/models/users';
import getSecret from '../secret/secret';

export default async function validateLogin(authorization: string) {
  const verifyAuth = jwt.verify(authorization, await getSecret()) as {
    id: number;
  };
  const user = await Users.findByPk(verifyAuth.id);
  if (!user) {
    throw new Error('Incorrect user');
  }
  return user.role;
}
