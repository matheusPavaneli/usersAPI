import IUserRepository from '../../interfaces/User/IUserRepository';
import IUserValidator from '../../interfaces/User/IUserValidator';
import UserRepository from '../User/UserRepository';
import UserValidator from '../User/UserValidator';
import UserManager from '../User/UserManager';
import UserModel from '../../models/User';
import regexMap from '../User/regexMap';
import IServiceReturn from '../../interfaces/User/IServiceReturn';
import ResponseManager from './ResponseManager';
import TokenManager from './TokenManager';
import IResponseManager from '../../interfaces/Global/IResponseManager';
import ITokenManager from '../../interfaces/Global/ITokenManager';

const createServices = (): IServiceReturn => {
  const userRepository: IUserRepository = new UserRepository(UserModel);
  const userValidator: IUserValidator = new UserValidator(
    regexMap,
    userRepository,
  );
  const tokenManager: ITokenManager = new TokenManager();
  const userManager = new UserManager(userRepository, userValidator);
  const responseManager: IResponseManager = new ResponseManager();

  return { userManager, userValidator, responseManager, tokenManager };
};

export const services = createServices();
