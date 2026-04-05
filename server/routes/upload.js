import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadBufferToCloudinary } from "../config/cloudinary.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "Upload endpoint is available. Send an authenticated POST request with multipart/form-data using the image field."
  });
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  if (!req.file?.buffer) {
    return res.status(400).json({ error: "Please choose an image to upload." });
  }

  if (!req.file.mimetype?.startsWith("image/")) {
    return res.status(400).json({ error: "Only image uploads are supported for events." });
  }

  try {
    const result = await uploadBufferToCloudinary(req.file.buffer, { folder: "events" });
    return res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
