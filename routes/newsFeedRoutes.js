// newsFeedRoutes.js
import express from "express";
import * as newsFeedController from "../controllers/newsFeedController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Define routes for news feed items
router
  .route("/")
  .get(newsFeedController.getAllNewsFeedItems) // Get all news feed items
  .post(
    authController.restrictTo("user", "admin"),
    newsFeedController.createNewsFeedItem
  ); // Create a new news feed item

router
  .route("/:id")
  .get(newsFeedController.getNewsFeedItemById) // Get a single news feed item by ID
  .patch(
    authController.restrictTo("user", "admin"),
    newsFeedController.updateNewsFeedItem
  ) // Update a news feed item by ID
  .delete(
    authController.restrictTo("admin"),
    newsFeedController.deleteNewsFeedItem
  ); // Delete a news feed item by ID

export default router;
