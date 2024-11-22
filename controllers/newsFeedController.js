import NewsFeed from "../models/newsFeedModel.js";
import * as factory from "../controllers/handleFactory.js";

// Controller to create a new news feed item
export const createNewsFeedItem = factory.createOne(NewsFeed);

// Controller to get all news feed items
export const getAllNewsFeedItems = factory.getAll(NewsFeed, "-createdAt");

// Controller to get a single news feed item by ID
// Populates the author field with the "email" property
export const getNewsFeedItemById = factory.getOne(NewsFeed, {
  path: "author",
  select: "email",
});

// Controller to update a news feed item by ID
export const updateNewsFeedItem = factory.updateOne(NewsFeed);

// Controller to delete a news feed item by ID
export const deleteNewsFeedItem = factory.deleteOne(NewsFeed);
