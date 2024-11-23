import React from 'react';
import './EventCard.css';

const EventCard = ({ image, title, date, venue, description }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-image" />
      <div className="event-details">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">{date} | {venue}</p>
        <p className="event-description">{description}</p>
        <button className="rsvp-button">RSVP</button>
      </div>
    </div>
  );
};

export default EventCard;
