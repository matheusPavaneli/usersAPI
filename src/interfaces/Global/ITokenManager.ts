import { Response, Request } from 'express';
import IUser from '../User/IUser';

export default interface ITokenManager {
  createToken(user: IUser | null): Promise<string>;
  saveToken(res: Response, token: string): Promise<Response>;
  removeToken(req: Request, res: Response): Promise<Response | Error>;
}
