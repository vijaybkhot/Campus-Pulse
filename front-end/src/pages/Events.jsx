import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import DataService from '../api/DataService';
import '../components/EventCard.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    console.log("hiiii i am inb evetbs")
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await DataService.getAllEvents();
                setEvents(fetchedEvents);
            } catch (err) {
                setError('Failed to load events');
            }
        };

        fetchEvents();
    }, []);

    if (error) return <p>{error}</p>;
    if (!events.length) return <p>No events found.</p>;

    return (
        <div className="events-container">
            <h2 className="events-header">Upcoming Events</h2>
            <div className="events-list">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="event-card-wrapper"
                        onClick={() => navigate(`/events/${event._id}`)}
                    >
                        <EventCard
                            image={event.image || '/assets/default_event.jpg'}
                            title={event.title}
                            date={new Date(event.date).toLocaleDateString()}
                            venue={event.location}
                            description={event.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
