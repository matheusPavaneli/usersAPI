import { Response } from 'express';

import IResponseData from '../../interfaces/Global/IResponseData';
import IResponseManager from '../../interfaces/Global/IResponseManager';

export default class ResponseManager implements IResponseManager {
  sendSuccess(responseData: IResponseData): Response {
    const { res, statusCode, message, data } = responseData;
    return res.status(statusCode).json({ status: 'success', message, data });
  }
  sendError(responseData: IResponseData): Response {
    const { res, statusCode, message } = responseData;
    return res.status(statusCode).json({ status: 'error', message });
  }
}
