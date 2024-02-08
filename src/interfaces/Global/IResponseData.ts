import { Response } from 'express';
import IUser from '../User/IUser';

export default interface IResponseData {
  res: Response;
  statusCode: number;
  message: string | string[];
  data?: IUser | IUser[];
}
