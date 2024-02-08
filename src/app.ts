import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  routes(): void {
    this.app.use('/user', userRoutes);
    this.app.use('/', authRoutes);
  }
}

export default new App().app;
