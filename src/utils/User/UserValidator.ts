import mongoose from 'mongoose';
import IFieldsValidate from '../../interfaces/User/IFieldsValidate';
import IRegexMap from '../../interfaces/User/IRegexMap';
import IUser from '../../interfaces/User/IUser';
import IUserLogin from '../../interfaces/User/IUserLogin';
import IUserRepository from '../../interfaces/User/IUserRepository';
import IUserValidator from '../../interfaces/User/IUserValidator';
import IUserCreation from '../../interfaces/User/IUserCreation';

export default class UserValidator implements IUserValidator {
  private _errors: string[] = [];
  private _user: IUser | null = null;

  constructor(
    private regexMap: IRegexMap,
    private userRepository: IUserRepository,
  ) {}

  async validateCreationFields(userFields: IFieldsValidate): Promise<string[]> {
    this.clearErrors();
    this.validateFields(userFields);
    await this.checkUserExistence(userFields);
    return this._errors;
  }

  async validateLoginFields(userFields: IUserLogin): Promise<string[]> {
    this.clearErrors();
    const { loginValue, password } = userFields;

    this.validateFormat(
      this.isEmail(loginValue) ? 'email' : 'username',
      loginValue,
    );
    this.validateFormat('password', password);

    if (this._errors.length > 0) {
      return this._errors;
    }

    try {
      const user = await this.getUserByLoginValue(loginValue);

      if (!user) {
        this._errors.push('Invalid credentials');
        return this._errors;
      }

      const isValidPassword = await this.validatePassword(user, password);

      if (!isValidPassword) {
        return this._errors;
      }

      this._user = user;
      return this._errors;
    } catch (error) {
      if (error instanceof Error) {
        this._errors.push(`Internal Server Error: ${error.message}`);
      }
      return this._errors;
    }
  }

  private validateFormat(fieldName: string, value: string): void {
    if (!value) {
      this._errors.push(`The ${fieldName} cannot be left blank`);
      return;
    }

    const fieldRegex = this.regexMap[fieldName];

    if (!fieldRegex) {
      this._errors.push(
        `Unable to find required validation regex for ${fieldName}`,
      );
      return;
    }

    if (!fieldRegex.test(value)) {
      this._errors.push(`The ${fieldName} has an invalid format`);
    }
  }

  async validateToRemove(id: string): Promise<string[]> {
    await this.validateId(id);

    if (this._errors.length > 0) {
      return this._errors;
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      this._errors.push('No user found with this ID');
      return this._errors;
    }

    return this._errors;
  }

  async validateToEdit(
    id: string,
    userData: IUserCreation,
  ): Promise<string[] | IUser> {
    this._user = null;
    this.clearErrors();
    this.validateId(id);

    if (this._errors.length > 0) {
      return this._errors;
    }

    this.validateFields(userData);
    await this.checkUserExistence(userData);
    const user = await this.userRepository.findById(id);

    if (this._errors.length > 0) {
      return this._errors;
    }

    if (user) {
      this._user = user;
      return this._user;
    }

    return this._errors;
  }

  private async validateId(id: string): Promise<string[]> {
    this.clearErrors();
    if (!id) {
      this._errors.push('ID not provided');
      return this._errors;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      this._errors.push('Invalid ID format');
    }

    return this._errors;
  }

  private async validatePassword(
    user: IUser,
    password: string,
  ): Promise<boolean> {
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      this._errors.push('Invalid credentials');
    }

    return isValidPassword;
  }

  private async getUserByLoginValue(loginValue: string): Promise<IUser | null> {
    const userByEmail = await this.userRepository.findByEmail(loginValue);
    const userByUsername = await this.userRepository.findByUsername(loginValue);

    return userByEmail ?? userByUsername;
  }

  private validateFields(userFields: IFieldsValidate): void {
    for (const [key, value] of Object.entries(userFields)) {
      this.validateFormat(key, value);
    }
  }

  private async checkUserExistence(
    userFields: IFieldsValidate,
  ): Promise<string[]> {
    const { username, email } = userFields;

    try {
      if (username && (await this.userRepository.findByUsername(username))) {
        this._errors.push('This username already exists');
      }
      if (email && (await this.userRepository.findByEmail(email))) {
        this._errors.push('This email already exists');
      }
      return this._errors;
    } catch (error) {
      if (error instanceof Error) {
        this._errors.push(`Internal Server Error: ${error.message}`);
      }
      return this._errors;
    }
  }

  get errors(): string[] {
    return this._errors;
  }

  private clearErrors(): void {
    this._errors = [];
  }

  private isEmail(value: string): boolean {
    return value.includes('@');
  }

  public get user(): IUser | null {
    return this._user;
  }
}
