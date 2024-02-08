import mongoose, { Schema } from 'mongoose';

import ITask from '../interfaces/Global/ITask';

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, default: '', unique: true },
    description: { type: String, required: false, default: '' },
    isCompleted: { type: Boolean, required: false, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const TaskModel = mongoose.model<ITask>('Task', taskSchema);

export default TaskModel;
