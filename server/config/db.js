import mongoose from "mongoose";

export async function connectDatabase(uri) {
  if (!uri) {
    return;
  }

  await mongoose.connect(uri);
}
