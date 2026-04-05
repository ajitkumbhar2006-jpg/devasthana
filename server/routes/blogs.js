import { Router } from "express";
import { configureCloudinary, uploadBufferToCloudinary } from "../config/cloudinary.js";
import { createBlog, getBlogs } from "../controllers/blogsController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!configureCloudinary()) {
    return res.status(500).json({ error: "Cloudinary is not configured." });
  }

  if (!req.file?.buffer) {
    return res.status(400).json({ error: "A file upload is required." });
  }

  try {
    const result = await uploadBufferToCloudinary(req.file.buffer, { folder: "blogs" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
