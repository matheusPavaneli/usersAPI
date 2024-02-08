import { Request, Response } from 'express';
import { services } from '../utils/Global/createServices';

class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    const { userManager, responseManager } = services;
    try {
      const users = await userManager.getUsers();
      return responseManager.sendSuccess({
        res,
        statusCode: 200,
        message: 'users',
        data: users,
      });
    } catch (error) {
      return responseManager.sendError({
        res,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { userManager, userValidator, responseManager } = services;
    const { username, email, password } = req.body;

    try {
      await userManager.createUser({ email, username, password });
    } catch (error) {
      return responseManager.sendError({
        res,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }

    if (userValidator.errors.length > 0) {
      return responseManager.sendError({
        res,
        statusCode: 400,
        message: userValidator.errors,
      });
    }

    return responseManager.sendSuccess({
      res,
      statusCode: 201,
      message: 'User created',
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { userManager, userValidator, responseManager, tokenManager } =
      services;
    const { id } = req.params;

    try {
      await userManager.deleteUser(id);
    } catch (error) {
      return responseManager.sendError({
        res,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }

    if (userValidator.errors.length > 0) {
      return responseManager.sendError({
        res,
        statusCode: 404,
        message: userValidator.errors,
      });
    }

    await tokenManager.removeToken(req, res);

    return responseManager.sendSuccess({
      res,
      statusCode: 200,
      message: 'User removed',
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { userManager, userValidator, responseManager, tokenManager } =
      services;
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
      await userManager.editUser(id, {
        username,
        email,
        password,
      });

      const user = userValidator.user;
      if (user) {
        await tokenManager.removeToken(req, res);
        const token = await tokenManager.createToken(user);
        await tokenManager.saveToken(res, token);
      }
    } catch (error) {
      return responseManager.sendError({
        res,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }

    if (userValidator.errors.length > 0) {
      return responseManager.sendError({
        res,
        statusCode: 404,
        message: userValidator.errors,
      });
    }

    return responseManager.sendSuccess({
      res,
      statusCode: 200,
      message: 'User edited',
    });
  }
}

export default new UserController();
