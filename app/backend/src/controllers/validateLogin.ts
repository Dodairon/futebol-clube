import { RequestHandler } from 'express';
import validateLogin from '../Services/validateLogin';

const loginValidate: RequestHandler = async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Error('Authorization is noti faundi');
    }
    const result = await validateLogin(authorization);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export default loginValidate;
