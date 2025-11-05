import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Story", storySchema);
