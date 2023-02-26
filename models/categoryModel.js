import mongoose from "mongoose";
// import { softDeletePlugin } from 'soft-delete-plugin-mongoose'
const categorySchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        default: null
    }
  },
  {
    timestamps: true,
  }
);

// categorySchema.plugin(softDeletePlugin);

const Category = mongoose.model("Category", categorySchema);

export default Category;
