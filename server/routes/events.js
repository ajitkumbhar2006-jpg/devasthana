import { Router } from "express";
import auth from "../middleware/auth.js";
import { createEvent, deleteEvent, getEvents } from "../controllers/eventsController.js";

const router = Router();

router.get("/", getEvents);
router.post("/", auth, createEvent);
router.delete("/:id", auth, deleteEvent);

export default router;
