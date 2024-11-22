import mongoose from "mongoose";

// Destructure the Schema from mongoose
const { Schema } = mongoose;

// Define the NewsFeed Schema
const newsFeedSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A news feed item must have a title"],
      trim: true,
      maxlength: [150, "Title must be less than 150 characters"],
    },
    content: {
      type: String,
      required: [true, "A news feed item must have content"],
      maxlength: [2000, "Content must be less than 2000 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A news feed item must have an author"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    media: {
      type: String,
      default: null, // URL for an image or video if any
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [30, "Each tag must be less than 30 characters"],
      },
    ],
    category: {
      type: String,
      enum: ["announcement", "event", "news", "social", "other"],
      default: "news",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to update the `updatedAt` field on each save
newsFeedSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Query middleware to automatically populate the author field with user email on find
newsFeedSchema.pre(/^find/, function (next) {
  this.populate("author", "email");
  next();
});

// Create and export the NewsFeed model
const NewsFeed = mongoose.model("NewsFeed", newsFeedSchema);
export default NewsFeed;
