import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "../middleware/auth.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// Configure Cloudinary (if credentials are provided)
const hasCloudinaryConfig =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn(
    "Cloudinary credentials not found. Using local file storage fallback."
  );
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for both memory and disk storage
const storage = hasCloudinaryConfig
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    });

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Upload image
router.post("/image", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    if (hasCloudinaryConfig) {
      // Upload to Cloudinary
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "ataryo",
                resource_type: "image",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(req.file.buffer);
        });

        res.json({
          url: result.secure_url,
          publicId: result.public_id,
        });
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        res.status(500).json({
          message:
            "Cloudinary upload failed. Please check your Cloudinary configuration.",
          error: cloudinaryError.message,
        });
      }
    } else {
      // Local file storage fallback
      const fileUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${
        req.file.filename
      }`;

      res.json({
        url: fileUrl,
        publicId: req.file.filename,
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
});

// Delete image
router.delete("/image/:publicId", auth, async (req, res) => {
  try {
    const { publicId } = req.params;

    if (hasCloudinaryConfig) {
      // Delete from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId);
      res.json({ message: "Image deleted successfully", result });
    } else {
      // Delete local file
      const filePath = path.join(uploadsDir, publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ message: "Image deleted successfully" });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

export default router;
