import Asset from "../models/Asset.js";

export const uploadAsset = async (req, res) => {
  try {
    const assetFile = req.files?.assetFile?.[0];
    const previewImage = req.files?.previewImage?.[0];

    if (!assetFile || !previewImage) {
      return res.status(400).json({
        message: "Asset file & preview image are required",
      });
    }

    const { title, description, category, price, tags, license, isFree } =
      req.body;

    const asset = await Asset.create({
      title,
      description,
      category,
      price: isFree ? 0 : price,
      license,
      isFree,

      tags: tags?.split(",").map((t) => t.trim()),

      // Cloudinary + Multer paths
      assetUrl: assetFile.path,
      previewUrl: previewImage.path,

      // store metadata
      fileType: assetFile.mimetype,
      fileSize: assetFile.size,

      // optional — stored if available
      publicId: assetFile.filename || assetFile.public_id,
      secureUrl: assetFile.secure_url || assetFile.path,

      seller: req.user._id,
      status: "pending", // marketplace workflow
    });

    res.status(201).json({
      message: "Asset submitted for review",
      asset,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};
