import IUser from './IUser';
import IUserCreation from './IUserCreation';
import IUserLogin from './IUserLogin';

export default interface IUserManager {
  createUser(user: IUserCreation): Promise<IUser | string[]>;
  authenticateUser(user: IUserLogin): Promise<IUser | string[]>;
  deleteUser(id: string): Promise<string[] | null>;
  editUser(
    id: string,
    userData: IUserCreation,
  ): Promise<IUser | null | string[]>;
  getUsers(): Promise<IUser[]>;
}
