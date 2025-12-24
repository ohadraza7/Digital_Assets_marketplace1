import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "digital-assets",
    resource_type: "auto", // image, video, audio
    allowed_formats: ["jpg", "png", "mp4", "mp3", "wav"],
  },
});

const upload = multer({ storage });

export default upload;
