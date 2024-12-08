import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css';
import DataService from '../api/DataService';
const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                console.log("Fetching event details for ID:", eventId);
                const fetchedEvent = await DataService.getEventById(eventId);
    
                // Ensure the correct data structure is set in the state
                if (fetchedEvent && fetchedEvent.daYta) {
                    console.log("Fetched Event Data:", fetchedEvent.data);
                    setEvent(fetchedEvent.data); // Assuming event data is in fetchedEvent.data
                } else {
                    console.error("Invalid event data structure:", fetchedEvent);
                    setError("Invalid event data structure");
                }
            } catch (err) {
                console.error("Error loading event details:", err);
                setError("Failed to load event details");
            } finally {
                setLoading(false);
            }
        };
    
        fetchEventDetails();
    }, [eventId]);
    
    if (error) return <p>{error}</p>;
    if (!event) return <p>Loading event details...</p>;

    const {
        title = 'Untitled Events',
        image = '/assets/default_event.jpg',
        date,
        location = 'Location not available',
        description = 'No description available',
        category = 'Not categorized',
        maxAttendees = 'No limit',
    } = event;

    return (
        <div className="event-details-container">
            <h1 className="event-title">{title}</h1>
            <img
                src={image}
                alt={title}
                className="event-image"
            />
            <div className="event-info">
                <p><strong>Date:</strong> {date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No date available'}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Max Attendees:</strong> {maxAttendees}</p>
            </div>
        </div>
    );
};

export default EventDetails;
