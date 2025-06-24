import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  key: String,
  originalName: String,
  owner: String,
  uploadedAt: { type: Date, default: Date.now },
  shareToken: { type: String }, // <-- add this line!
});

export default mongoose.models.File || mongoose.model("File", FileSchema);
