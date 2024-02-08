import IUser from '../../interfaces/User/IUser';
import IUserCreation from '../../interfaces/User/IUserCreation';
import IUserLogin from '../../interfaces/User/IUserLogin';
import IUserManager from '../../interfaces/User/IUserManager';
import IUserRepository from '../../interfaces/User/IUserRepository';
import IUserValidator from '../../interfaces/User/IUserValidator';

export default class UserManager implements IUserManager {
  constructor(
    private userRepository: IUserRepository,
    private userValidator: IUserValidator,
  ) {}

  async createUser(user: IUserCreation): Promise<IUser | string[]> {
    const validationErrors =
      await this.userValidator.validateCreationFields(user);

    if (validationErrors.length > 0) {
      return validationErrors;
    }

    try {
      return await this.userRepository.create(user);
    } catch (error) {
      throw new Error('Creation error');
    }
  }

  async authenticateUser(user: IUserLogin): Promise<IUser | string[]> {
    const validationErrors = await this.userValidator.validateLoginFields(user);

    if (validationErrors.length > 0) {
      return validationErrors;
    }

    const authenticatedUser = this.userValidator.user;
    if (authenticatedUser) {
      return authenticatedUser;
    } else {
      throw new Error('Authentication error');
    }
  }

  async deleteUser(id: string): Promise<string[] | null> {
    await this.userValidator.validateToRemove(id);

    if (this.userValidator.errors.length > 0) {
      return this.userValidator.errors;
    }

    return await this.userRepository.deleteUserById(id);
  }

  async editUser(
    id: string,
    userData: IUserCreation,
  ): Promise<IUser | null | string[]> {
    const user = await this.userValidator.validateToEdit(id, userData);

    if (this.userValidator.errors.length > 0) {
      return this.userValidator.errors;
    }

    await this.userRepository.editUserById(id, userData);
    return user;
  }

  async getUsers(): Promise<IUser[]> {
    const users = await this.userRepository.getUsers();
    return users;
  }
}
