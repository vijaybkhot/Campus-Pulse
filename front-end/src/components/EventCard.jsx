import React from 'react';
import './EventCard.css';

const EventCard = ({ image, title, date, venue, description }) => {
  return (
    <div className="event-card">
      <img 
        src={image || '/assets/default_event.jpg'} // Default image if none provided
        alt={title || 'Event Image'} 
        className="event-image" 
      />
      <div className="event-details">
        <h3 className="event-title">{title || 'Untitled Event'}</h3> {/* Fallback for missing title */}
        <p className="event-date">
          {date || 'Date not available'} {venue && `| ${venue}`} {/* Fallback for missing date/venue */}
        </p>
        <p className="event-description">
          {description || 'No description available.'} {/* Fallback for missing description */}
        </p>
        <button className="rsvp-button">RSVP</button>
      </div>
    </div>
  );
};

export default EventCard;
