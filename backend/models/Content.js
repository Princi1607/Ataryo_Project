import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
});

export default mongoose.model("Content", contentSchema);
