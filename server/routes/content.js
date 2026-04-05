import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createContent,
  deleteContent,
  getContent,
  updateContent
} from "../controllers/contentController.js";

const router = Router();

router.get("/:table", getContent);
router.post("/:table", auth, createContent);
router.put("/:table/:id", auth, updateContent);
router.delete("/:table/:id", auth, deleteContent);

export default router;
