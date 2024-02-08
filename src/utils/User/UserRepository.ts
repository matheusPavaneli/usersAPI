import mongoose from 'mongoose';

import IUser from '../../interfaces/User/IUser';
import IUserCreation from '../../interfaces/User/IUserCreation';
import IUserRepository from '../../interfaces/User/IUserRepository';

export default class UserRepository implements IUserRepository {
  private userModel: mongoose.Model<IUser>;

  constructor(userModel: mongoose.Model<IUser>) {
    this.userModel = userModel;
  }

  async create(user: IUserCreation): Promise<IUser> {
    const newUser = await this.userModel.create(user);
    return newUser.toObject();
  }

  async findByEmail(value: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email: value });
  }

  async findByUsername(value: string): Promise<IUser | null> {
    return await this.userModel.findOne({ username: value });
  }

  async findById(value: string): Promise<IUser | null> {
    return await this.userModel.findById(value);
  }

  async deleteUserById(value: string): Promise<null> {
    return await this.userModel.findByIdAndDelete(value);
  }

  async editUserById(
    id: string,
    userData: IUserCreation,
  ): Promise<IUser | null> {
    return await this.userModel.findByIdAndUpdate(id, userData);
  }

  async getUsers(): Promise<IUser[]> {
    return await this.userModel.find();
  }
}
