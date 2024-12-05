import Roommate from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

// Get all roommates with optional filters
export const getAllRoommates = catchAsync(async (req, res) => {
  const filters = {};
  const { smoking, pets, dietaryPreferences, gender, location } = req.query;

  // Smoking filter
  if (smoking) filters.smoking = smoking === "true";

  // Pets filter
  if (pets) filters.pets = pets === "true";

  // Dietary Preferences filter
  if (dietaryPreferences) {
    if (dietaryPreferences.toLowerCase() === "any") {
      // Skip filtering for dietary preferences if "any" is selected
      filters.dietaryPreferences = { $in: ["Vegetarian", "Non-Veg", "Vegan"] };
    } else {
      filters.dietaryPreferences = dietaryPreferences; // Match exact value
    }
  }

  // Gender filter
  if (gender) {
    filters.gender = gender.toLowerCase();
  }

  // Location filter
  if (location) {
    filters.locationPreference = location;
  }

  // Fetch roommates based on filters
  const roommates = await Roommate.find(filters);

  return res.status(200).json({
    message: "Roommates fetched successfully",
    roommates,
  });
});


export const matchRoommates = catchAsync(async (req, res) => {
  const { smoking, pets, dietaryPreferences, preferredRoommateGender } = req.query;

  const filters = {};

  // Smoking filter (default to true if undefined)
  if (smoking !== undefined) filters.smoking = smoking === "true";

  // Pets filter (default to true if undefined)
  if (pets !== undefined) filters.pets = pets === "true";

  // Dietary Preferences filter
  if (dietaryPreferences) {
    if (dietaryPreferences.toLowerCase() === "any") {
      filters.dietaryPreferences = { $in: ["Vegetarian", "Non-Veg", "Vegan"] };
    } else {
      filters.dietaryPreferences = dietaryPreferences;
    }
  }

  // Preferred Roommate Gender filter
  if (preferredRoommateGender) {
    filters.preferredRoommateGender = preferredRoommateGender.toLowerCase();
  }

  // Fetch roommates based on filters
  const matchedRoommates = await Roommate.find(filters);

  return res.status(200).json({
    message: "Matched roommates",
    matchedRoommates,
  });
});

