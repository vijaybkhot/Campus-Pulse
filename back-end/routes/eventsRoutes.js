import { Router } from 'express';
import { addEvent, viewEventDetails, viewAllEvents, registerForEvent, deleteEvent } from '../controllers/eventsController.js';
const router = Router();

router.post('/events', addEvent);  // Add event
router.get('/events', viewAllEvents); // View all events
router.get('/events/:id', viewEventDetails);  // View event details
router.post('/events/:id/register', registerForEvent);  // Register for event
router.delete('/events/:id', deleteEvent); // Delete an event

export default router;
