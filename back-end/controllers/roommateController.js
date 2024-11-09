import Roommate from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

// Get all roommates with optional filters
export const getAllRoommates = catchAsync(async (req, res) => {
  const filters = {};
  const { smoking, pets, dietaryPreferences, gender, location } = req.query;

  if (smoking) filters.smoking = smoking === "true";
  if (pets) filters.pets = pets === "true";
  if (dietaryPreferences) filters.dietaryPreferences = dietaryPreferences;
  if (gender) filters.gender = gender;
  if (location) filters.location = location;

  const roommates = await Roommate.find(filters);

  return res.status(200).json({
    message: "Roommates fetched successfully",
    roommates,
  });
});

// Example matching roommates based on preferences
export const matchRoommates = catchAsync(async (req, res) => {
  const { smoking, pets, dietaryPreferences, preferredRoommateGender } =
    req.query;

  const filters = {
    smoking: smoking === "true" || smoking === undefined ? true : false,
    pets: pets === "true" || pets === undefined ? true : false,
    dietaryPreferences: dietaryPreferences || undefined,
    preferredRoommateGender: preferredRoommateGender || undefined,
  };

  const matchedRoommates = await Roommate.find(filters);

  return res.status(200).json({
    message: "Matched roommates",
    matchedRoommates,
  });
});
