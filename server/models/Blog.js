import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    date: String,
    excerpt: String,
    content: String,
    image: String
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
