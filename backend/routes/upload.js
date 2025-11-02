import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Upload routes (root and alias /image) - protected
const handler = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.json({ url: `${baseUrl}/uploads/${req.file.filename}` });
};

router.post("/", verifyToken, upload.single("file"), handler);
router.post("/image", verifyToken, upload.single("file"), handler);

export default router;
