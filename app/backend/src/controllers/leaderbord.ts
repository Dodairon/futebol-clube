import { RequestHandler } from 'express';
import homeLeaderBoard from '../Services/leaderboard';

const homeBoard: RequestHandler = async (req, res) => {
  try {
    const board = await homeLeaderBoard();
    res.status(200).json(board);
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};

export default homeBoard;
