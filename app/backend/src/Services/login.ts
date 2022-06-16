import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/users';
import getSecret from '../secret/secret';

export default async function login(email: string, password: string) {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    throw new Error('Incorrect email or password');
  }
  const validPass = await compare(password, user.password);
  if (!validPass) {
    throw new Error('Incorrect email or password');
  }
  const token = jwt.sign({ id: user.id }, await getSecret());
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
}
