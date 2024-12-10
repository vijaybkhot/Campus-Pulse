import React from 'react';
import './EventCard.css';

const EventCard = ({ image, title, date, venue, description }) => {
    return (
        <div className="event-card">
            <img 
                src={image} 
                alt="" 
                className="event-image" 
            />
            <div className="event-details">
                <h3 className="event-title">{title || 'Untitled Event'}</h3>
                <p className="event-date">
                    {date || 'Date not available'} {venue && `| ${venue}`}
                </p>
                <p className="event-description">
                    {description || 'No description available.'}
                </p>
            </div>
        </div>
    );
};

export default EventCard;
