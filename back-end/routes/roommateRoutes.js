import express from "express";
import {
  getAllRoommates,
  matchRoommates,
} from "../controllers/roommateController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

// Routes for authenticated users only
router.use(protect); // Apply protect to all routes after this line

// Route to get all roommates with optional filters from URL query
router.get("/", getAllRoommates);

// Route to match roommates based on preferences (accessible to all authenticated users) with optional filters from URL query
// Example queries:
// 1. http://localhost:3000/api/roommates?smoking=true&gender=female - Female users who smoke
// 2. http://localhost:3000/api/roommates?pets=false&dietaryPreferences=Vegan - Roommates who have pets and are Vegan
router.get("/match", matchRoommates);

export default router;
