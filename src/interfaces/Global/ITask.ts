import { Document, Schema } from 'mongoose';

export default interface ITask extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
  category: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}
