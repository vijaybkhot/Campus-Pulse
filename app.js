import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Importing routes and middlewares
import {
  userRouter,
  eventRouter,
  roommateRouter,
  newsFeedRouter,
} from "./routes/index.js";
import globalErrorHandler from "./controllers/errorController.js";
import {
  compressionMiddleware,
  loggingMiddleware,
  rateLimiter,
  securityMiddleware,
  parserMiddlewares,
} from "./utils/middlewares/index.js";

// Start the express app
const app = express();

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __rootDir = dirname(__filename);
app.use(express.static(path.join(__rootDir, "public")));

// Set up middlewares

securityMiddleware(app);
loggingMiddleware(app);
compressionMiddleware(app);
parserMiddlewares(app);

// Rate limiting
app.use(rateLimiter);
console.log();

// Routes
app.use("/api/users", userRouter);
app.use("/api/roommates", roommateRouter);
app.use("/api/events", eventRouter);
app.use("/api/dashboard", newsFeedRouter);
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Catch-all route for unspecified paths
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(globalErrorHandler);

export default app;
