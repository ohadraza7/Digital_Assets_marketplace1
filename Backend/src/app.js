import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import { v2 as cloudinary } from "cloudinary"; //tempra
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();
// const ADMIN_PASSWORD = "Admin@123";
// const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
// console.log(hashedPassword);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
