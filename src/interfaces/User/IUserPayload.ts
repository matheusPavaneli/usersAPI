import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface IUserPayload extends Request, JwtPayload {
  id: string;
  username: string;
  email: string;
}
