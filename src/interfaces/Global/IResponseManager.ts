import IResponseData from './IResponseData';
import { Response } from 'express';

export default interface IResponseManager {
  sendSuccess(responseData: IResponseData): Response;
  sendError(responseData: IResponseData): Response;
}
