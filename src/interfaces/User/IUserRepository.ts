import IUser from './IUser';
import IUserCreation from './IUserCreation';

export default interface IUserRepository {
  create(user: IUserCreation): Promise<IUser>;
  findByEmail(value: string): Promise<IUser | null>;
  findByUsername(value: string): Promise<IUser | null>;
  findById(value: string): Promise<IUser | null>;
  deleteUserById(value: string): Promise<null>;
  editUserById(id: string, userData: IUserCreation): Promise<IUser | null>;
  getUsers(): Promise<IUser[]>;
}
