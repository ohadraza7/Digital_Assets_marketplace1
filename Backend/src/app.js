import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import { v2 as cloudinary } from "cloudinary"; //tempra
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

// 4. TEMPORARY TEST: Check Cloudinary connection
cloudinary.api
  .ping()
  .then((result) => console.log("Cloudinary connected:", result))
  .catch((error) => console.error("Cloudinary error:", error));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/assets", assetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
