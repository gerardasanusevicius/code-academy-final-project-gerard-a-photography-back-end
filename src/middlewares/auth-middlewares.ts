import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import AdminModel from '../models/admin-model';

type DecodedInfo = { username: string, iat?: number };

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader === undefined) throw new Error('Login needed');

    const token = authHeader.split(' ')[1];
    if (token === undefined) throw new Error('Wrong Admin credentials');

    const decodedInfo = jwt.verify(token, config.token.secret) as DecodedInfo;

    req.tokenData = {
      username: decodedInfo.username,
      token: `Bearer ${token}`,
    };

    if (req.tokenData === undefined) {
      res.status(401).json({
        error: 'Login needed',
      });
      return;
    }

    const authAdmin = await AdminModel.findOne({ username: req.tokenData.username });

    if (authAdmin === null) {
      res.status(404).json({
        error: 'Admin not authenticated',
      });
      return;
    }

    req.authAdmin = authAdmin;

    next();
  } catch (error) {
    res.status(401).json({
      error: error instanceof Error ? error.message : 'Authentication error',
    });
  }
};
