import IResponseManager from '../Global/IResponseManager';
import ITokenManager from '../Global/ITokenManager';
import IUserManager from './IUserManager';
import IUserValidator from './IUserValidator';

export default interface IServiceReturn {
  userManager: IUserManager;
  userValidator: IUserValidator;
  tokenManager: ITokenManager;
  responseManager: IResponseManager;
}
