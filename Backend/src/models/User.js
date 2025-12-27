import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

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
      select: false, // never returned by default
    },

    role: {
      type: String,
      enum: ["buyer", "creator", "admin"],
      default: "buyer",
    },

    status: {
      type: String,
      enum: ["active", "suspended", "pending"],
      default: "active",
    },

    // ---------- PROFILE DATA ----------
    avatarUrl: String,
    bio: String,
    country: String,

    // ---------- SELLER METADATA ----------
    creatorProfile: {
      portfolioUrl: String,
      specialization: String,
      totalAssetsUploaded: {
        type: Number,
        default: 0,
      },
      totalEarnings: {
        type: Number,
        default: 0,
      },
    },

    // ---------- PLATFORM FLAGS ----------
    emailVerified: {
      type: Boolean,
      default: false,
    },

    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: Date,

    // ---------- SECURITY & ACCESS ----------

    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    // ---------- AUDIT TRAIL ----------
    createdByAdmin: {
      type: Boolean,
      default: false,
    },
    // Suspension system

    isSuspended: {
      type: Boolean,
      default: false,
    },

    suspendedReason: {
      type: String,
      default: null,
    },

    suspendedAt: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
