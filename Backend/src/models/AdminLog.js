import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  },
  { timestamps: true }
);

export default mongoose.model("AdminLog", logSchema);
