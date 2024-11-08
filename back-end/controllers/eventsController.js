import { getEventCollection } from '../db/db.js';
import { ObjectId } from 'mongodb';

// Add a new event
export const addEvent = async (req, res) => {
  try {
    const newEvent = req.body;
    const collection = await getEventCollection();
    const result = await collection.insertOne(newEvent);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send('Error adding event');
  }
};

// View event details
export const viewEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    const collection = await getEventCollection();
    const event = await collection.findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return res.status(404).send('Event not found');
    }

    res.json(event);
  } catch (err) {
    res.status(500).send('Error fetching event details');
  }
};

//view all events
export const viewAllEvents = async (req, res) => {
    try {
      const collection = await getEventCollection();
      const events = await collection.find().toArray(); // Retrieve all events
      res.json(events);
    } catch (err) {
      res.status(500).send('Error fetching events');
    }
  };

// Register for an event
export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { user } = req.body;

    const collection = await getEventCollection();
    const event = await collection.findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return res.status(404).send('Event not found');
    }

    if (event.attendees && event.attendees.includes(user)) {
      return res.status(400).send('User already registered');
    }

    event.attendees = event.attendees ? [...event.attendees, user] : [user];

    await collection.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: { attendees: event.attendees } }
    );

    res.status(200).send(`${user} successfully registered for the event`);
  } catch (err) {
    res.status(500).send('Error registering for the event');
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const collection = await getEventCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(eventId) });

    if (result.deletedCount === 0) {
      return res.status(404).send('Event not found');
    }

    res.status(200).send('Event deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting event');
  }
};