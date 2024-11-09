import express from "express";
import {
  getAllRoommates,
  matchRoommates,
} from "../controllers/roommateController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

// Routes for authenticated users only
router.use(protect); // Apply protect to all routes after this line

// Route to get all roommates with optional filters
router.get("/", getAllRoommates);

// Route to match roommates based on preferences (accessible to all authenticated users)
router.get("/match", matchRoommates);

export default router;
