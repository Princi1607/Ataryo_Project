import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { ensureAdminUser } from "./utils/createAdmin.js";

import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const app = express();

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    if (process.env.SEED_ADMIN === "true") {
      await ensureAdminUser();
    }
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
// Serve frontend build in production when enabled
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.SERVE_CLIENT === "true") {
  const clientDistPath = path.resolve(__dirname, "../dist");
  app.use(express.static(clientDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
