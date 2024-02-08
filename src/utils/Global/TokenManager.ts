import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, Request } from 'express';
import IUser from '../../interfaces/User/IUser';
import ITokenManager from '../../interfaces/Global/ITokenManager';

dotenv.config();

const secretKey = process.env.SECRET_KEY ?? 'default az';

export default class TokenManager implements ITokenManager {
  private _token: string = '';

  async createToken(user: IUser | null): Promise<string> {
    try {
      if (user) {
        this._token = jwt.sign(
          { id: user.id, username: user.username, email: user.email },
          secretKey,
          { expiresIn: '1d' },
        );
      }
      return this._token;
    } catch (error) {
      console.error('Error while creating token:', error);
      throw error;
    }
  }

  async saveToken(res: Response, token: string): Promise<Response> {
    try {
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res;
    } catch (error) {
      console.error('Error while saving token:', error);
      throw error;
    }
  }

  async removeToken(req: Request, res: Response): Promise<Response | Error> {
    try {
      if (req.cookies['token']) {
        res.clearCookie('token');
        return res;
      }
      throw new Error('Token not found');
    } catch (error) {
      console.error('Error while removing token:', error);
      throw error;
    }
  }
}
