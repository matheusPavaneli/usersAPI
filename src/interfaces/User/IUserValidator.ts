import IFieldsValidate from './IFieldsValidate';
import IUser from './IUser';
import IUserCreation from './IUserCreation';
import IUserLogin from './IUserLogin';

export default interface IUserValidator {
  validateCreationFields(userFields: IFieldsValidate): Promise<string[]>;
  validateLoginFields(userFields: IUserLogin): Promise<string[]>;
  validateToRemove(id: string): Promise<string[]>;
  validateToEdit(
    id: string,
    userData: IUserCreation,
  ): Promise<string[] | IUser>;
  get errors(): string[];
  get user(): IUser | null;
}
