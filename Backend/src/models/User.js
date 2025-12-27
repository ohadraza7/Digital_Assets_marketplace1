import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["buyer", "creator", "admin"],
      default: "buyer",
    },

    // Account lifecycle state
    status: {
      type: String,
      enum: ["active", "suspended", "pending"],
      default: "active",
    },

    // PROFILE
    avatarUrl: String,
    bio: String,
    country: String,

    // CREATOR DATA
    creatorProfile: {
      portfolioUrl: String,
      specialization: String,
      totalAssetsUploaded: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
    },

    emailVerified: { type: Boolean, default: false },

    isTwoFactorEnabled: { type: Boolean, default: false },

    lastLoginAt: Date,

    createdByAdmin: { type: Boolean, default: false },

    // Suspension
    suspendedReason: { type: String, default: null },
    suspendedAt: { type: Date, default: null },
    isSuspended: { type: Boolean, default: false },

    // Notifications
    notifications: [
      {
        message: String,
        type: {
          type: String,
          enum: ["info", "warning", "ban", "system"],
        },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
