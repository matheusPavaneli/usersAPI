import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { services } from '../utils/Global/createServices';
import IUserPayload from '../interfaces/User/IUserPayload';

const secretKey = process.env.SECRET_KEY ?? 'default az dev';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { responseManager } = services;
  const token = req.cookies['token'];

  if (!token) {
    return responseManager.sendError({
      res,
      statusCode: 403,
      message: 'Token is required for authentication',
    });
  }

  try {
    const userDecoded = jwt.verify(token, secretKey) as IUserPayload;
    res.locals.user = userDecoded;
    next();
  } catch (error) {
    return responseManager.sendError({
      res,
      statusCode: 401,
      message: 'Invalid Token',
    });
  }
}
