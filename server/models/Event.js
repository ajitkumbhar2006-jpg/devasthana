import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    date: String,
    description: String,
    content: String,
    image: String,
    type: {
      type: String,
      enum: ["upcoming", "past"],
      default: "upcoming"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
