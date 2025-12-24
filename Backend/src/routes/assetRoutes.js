import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadAsset } from "../controllers/assetController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { sellerOnly } from "../middlewares/sellerMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  sellerOnly,
  upload.fields([
    { name: "assetFile", maxCount: 1 },
    { name: "previewImage", maxCount: 1 },
  ]),
  uploadAsset
);

export default router;
