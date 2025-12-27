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
  suspendUser,
  unsuspendUser,
  getUserById,
} from "../controllers/adminAssetController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/assets/pending", protect, adminOnly, getPendingAssets);
router.get("/assets/review/:id", protect, adminOnly, getAssetForReview);
router.put("/assets/review/:id/approve", protect, adminOnly, approveAsset);
router.put("/assets/review/:id/reject", protect, adminOnly, rejectAsset);
// APPROVED ASSETS ROUTE
router.get("/assets/approved", protect, adminOnly, getApprovedAssets);
// REJECTED ASSETS ROUTE
router.get("/assets/rejected", protect, adminOnly, getRejectedAssets);
// DASHBOARD STATS ROUTE
router.get("/dashboard/stats", protect, adminOnly, getDashboardStats);
// ADMIN REPORTS ROUTE
router.get("/reports", protect, adminOnly, getAdminReports);

// USER MANAGEMENT ROUTES
router.put("/users/:userId/suspend", protect, adminOnly, suspendUser);
router.put("/users/:userId/unsuspend", protect, adminOnly, unsuspendUser);

// GET ALL USERS
router.get("/users", protect, adminOnly, getAllUsers);

// UPDATE USER STATUS (Suspend / Restore)
router.get("/users/:id", protect, adminOnly, getUserById);

export default router;
