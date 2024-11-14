import mongoose from "mongoose";

// Sample event input:
// {
//   "title": "Tech Conference 2024",
//   "description": "An event for tech enthusiasts to discuss the latest trends in technology.",
//   "date": "2024-12-15T10:00:00.000Z",
//   "location": "New York City, NY",
//   "category": "tech",
//   "maxAttendees": 200,
//   "createdBy": "672ed687dcbcb3abc4fd0e40"
// }

// Destructure the Schema from mongoose
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "An event must have a title"],
      trim: true,
      maxlength: [100, "Event title must be less than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Event description must be less than 500 characters"],
    },
    date: {
      type: Date,
      required: [true, "An event must have a date"],
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Event date must be in the future",
      },
    },
    location: {
      type: String,
      required: [true, "An event must have a location"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["sports", "music", "tech", "arts", "social", "volunteering"],
      required: [true, "An event must have a category"],
    },
    maxAttendees: {
      type: Number,
      default: 100,
      min: [1, "Event must have at least one attendee"],
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "An event must have a creator"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to update the `updatedAt` field on each save
eventSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Query middleware to automatically populate the creator and attendees on find
eventSchema.pre(/^find/, function (next) {
  this.populate("createdBy", "username email").populate(
    "attendees",
    "username email"
  );
  next();
});

// Create and export the Event model
const Event = mongoose.model("Event", eventSchema);
export default Event;
