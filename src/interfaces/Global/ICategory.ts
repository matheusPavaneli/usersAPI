import { Document, Schema } from 'mongoose';

export default interface ICategory extends Document {
  name: string;
  tasksId: Schema.Types.ObjectId;
}
