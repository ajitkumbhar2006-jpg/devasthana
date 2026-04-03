import { Router } from "express";
import { getBlogs } from "../controllers/blogsController.js";

const router = Router();

router.get("/", getBlogs);

export default router;
