import dotenv from 'dotenv';
dotenv.config();

export default {
  origin: process.env.ORIGIN_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
