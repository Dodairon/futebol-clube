import { RequestHandler } from 'express';
import login from '../Services/login';

const loginController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.status(200).json( result );
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};

export default loginController;
