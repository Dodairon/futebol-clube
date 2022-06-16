import * as fs from 'fs/promises';

export default function getSecret() {
  return fs.readFile('jwt.evaluation.key', 'utf8');
}
