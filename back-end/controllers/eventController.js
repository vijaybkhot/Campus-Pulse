import Event from "../models/eventsModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import * as factory from "./handleFactory.js";

// Create an event
export const createEvent = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    date,
    location,
    category,
    maxAttendees,
    createdBy,
  } = req.body;

  // Ensure that the user who creates the event exists
  const event = await Event.create({
    title,
    description,
    date,
    location,
    category,
    maxAttendees,
    createdBy: req.user.id, // req.user is populated via authentication middleware
  });

  res.status(201).json({
    status: "success",
    data: {
      event,
    },
  });
});

// Get all events
export const getAllEvents = factory.getAll(Event); // Using a factory function for getAll

// Get a single event by ID
export const getEventById = factory.getOne(Event);

// Update an event
export const updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

// Delete an event
export const deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Add an attendee to an event
export const addAttendee = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }

  if (event.attendees.includes(req.user.id)) {
    return next(new AppError("You are already attending this event", 400));
  }

  if (event.attendees.length >= event.maxAttendees) {
    return next(
      new AppError(
        "This event has reached its maximum number of attendees",
        400
      )
    );
  }

  event.attendees.push(req.user.id);
  await event.save();

  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

// Remove an attendee from an event
export const removeAttendee = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }

  const index = event.attendees.indexOf(req.user.id);
  if (index === -1) {
    return next(new AppError("You are not attending this event", 400));
  }

  event.attendees.splice(index, 1);
  await event.save();

  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

// Get events created by a specific user
export const getUserEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find({ createdBy: req.user.id });

  if (!events || events.length === 0) {
    return next(new AppError("No events found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      events,
    },
  });
});
