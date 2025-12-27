import express from "express";
import {
  getPendingAssets,
  approveAsset,
  rejectAsset,
  getAssetForReview,
  getApprovedAssets,
  getRejectedAssets,
  getDashboardStats,
  getAdminReports,
  getAllUsers,
  updateUserStatus,
} from "../controllers/adminAssetController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/assets/pending", protect, adminOnly, getPendingAssets);
router.get("/assets/review/:id", protect, adminOnly, getAssetForReview);
router.put("/assets/review/:id/approve", protect, adminOnly, approveAsset);
router.put("/assets/review/:id/reject", protect, adminOnly, rejectAsset);

router.get("/assets/approved", protect, adminOnly, getApprovedAssets);

router.get("/assets/rejected", protect, adminOnly, getRejectedAssets);

router.get("/dashboard/stats", protect, adminOnly, getDashboardStats);
router.get("/reports", protect, adminOnly, getAdminReports);

// GET ALL USERS
router.get("/users", protect, adminOnly, getAllUsers);

// UPDATE USER STATUS (Suspend / Restore)
router.put("/users/:id/status", protect, adminOnly, updateUserStatus);

export default router;
