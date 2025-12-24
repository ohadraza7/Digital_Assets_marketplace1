import mongoose from "mongoose";
import User from "./User.js";

const assetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    category: {
      type: String,
      enum: ["photo", "video", "music", "graphics", "document"],
      required: true,
    },

    tags: [{ type: String }],

    price: { type: Number, required: true },

    assetUrl: { type: String, required: true },
    secureUrl: { type: String },

    publicId: { type: String, required: true },

    fileType: { type: String },
    fileSize: { type: Number },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Asset", assetSchema);
