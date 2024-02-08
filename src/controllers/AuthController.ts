import { Request, Response } from 'express';
import { services } from '../utils/Global/createServices';

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { userManager, userValidator, responseManager, tokenManager } =
      services;
    const { loginValue, password } = req.body;

    try {
      await userManager.authenticateUser({ loginValue, password });

      if (userValidator.errors.length > 0) {
        return responseManager.sendError({
          res,
          statusCode: 400,
          message: userValidator.errors,
        });
      }

      const user = userValidator.user;

      const token = await tokenManager.createToken(user);
      await tokenManager.saveToken(res, token);

      return responseManager.sendSuccess({
        res,
        statusCode: 200,
        message: 'Logged in successfully',
      });
    } catch (error) {
      return responseManager.sendError({
        res,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    const { responseManager, tokenManager } = services;

    try {
      await tokenManager.removeToken(req, res);
      return responseManager.sendSuccess({
        res,
        statusCode: 200,
        message: 'Logout successfully',
      });
    } catch (error) {
      return responseManager.sendError({
        res,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}

export default new AuthController();
