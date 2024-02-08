import mongoose, { Schema } from 'mongoose';

import ICategory from '../interfaces/Global/ICategory';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, default: '' },
    tasksId: { Type: Schema.Types.ObjectId },
  },
  {
    timestamps: false,
  },
);

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);

export default CategoryModel;
