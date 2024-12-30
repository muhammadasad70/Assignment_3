import express from "express";
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from "../controller/eventController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/create", protect, restrictTo("admin"), createEvent);
router.get("/get/:id", getEvent);
router.put("/update/:id", protect, restrictTo("admin"), updateEvent);
router.delete("/delete/:id", protect, restrictTo("admin"), deleteEvent);

export default router;