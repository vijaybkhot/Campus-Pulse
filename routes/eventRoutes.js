import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect); // All routes below this line require authentication

// Route to get all events (accessible to all authenticated users)
router.get("/", getAllEvents);

// Route to get a specific event by ID (accessible to all authenticated users)
router.get("/:id", getEventById);

// Routes restricted to admins only
router.use(restrictTo("admin")); // Only admins can access routes below this line

// Route to create a new event (admin only)
router.post("/", createEvent);

// Route to update an event by ID (admin only)
router.patch("/:id", updateEvent);

// Route to delete an event by ID (admin only)
router.delete("/:id", deleteEvent);

export default router;
