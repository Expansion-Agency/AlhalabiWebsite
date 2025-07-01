import { Schema, model, mongoose } from "mongoose";

const categorySchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  Image: {
    type: String,
    required: true,
  },
},{
    timestamps : true,
});

export const Category =
  mongoose.models.categoryModel || mongoose.model("Category", categorySchema);
