import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import app from '../app';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL ?? 'base_url');
    app.emit('db ready');
  } catch (error) {
    console.error('Error connecting with MongoDB:', error);
  }
};

export default connectToDatabase;
