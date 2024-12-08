import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataService from '../api/DataService';
import './EventDetails.css';

const EventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control showing the message

    const handleRSVP = () => {
        setShowConfirmation(true); // Show the confirmation message
        alert("✅ You are successfully registered! See you there!");
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await DataService.getEventById(eventId);
                setEvent(response.data); // Only store the event data
            } catch (err) {
                console.error("Error fetching event details:", err);
                setError("Failed to load event details");
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) return <p>Loading event details...</p>;
    if (error) return <p>{error}</p>;
    if (!event) return <p>No event details found.</p>;

    return (
        <div className="event-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
            <h1 className="event-title">{event.title}</h1>
            {event.image && (
                <img
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                />
            )}
            <div className="event-info">
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Max Attendees:</strong> {event.maxAttendees}</p>
            </div>
            {/* RSVP Button Below the Info */}
            <div className="rsvp-section">
                <button className="rsvp-button" onClick={handleRSVP}>RSVP</button>
                {showConfirmation && (
                    <p className="rsvp-message">You will receive an email with more info later.</p>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
