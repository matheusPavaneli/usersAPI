import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

import corsConfig from './config/corsConfig';
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
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(corsConfig));
    this.app.use(cookieParser());
  }

  routes(): void {
    this.app.use('/user', userRoutes);
    this.app.use('/', authRoutes);
  }
}

export default new App().app;
