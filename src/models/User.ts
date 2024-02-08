import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import IUser from '../interfaces/User/IUser';

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    password: { type: String, required: true, default: '' },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('error comparing passwords');
  }
};

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
