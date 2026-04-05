import { Router } from "express";
import { getContacts, postContact } from "../controllers/contactController.js";

const router = Router();

router.get("/", getContacts);
router.post("/", postContact);

export default router;
