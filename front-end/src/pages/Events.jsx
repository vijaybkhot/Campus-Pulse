// pages/Events.jsx
import React from 'react';
import EventCard from '../components/EventCard';
import '../components/EventCard.css';

const Events = () => {
  const events = [
    {
        image: '/assets/networking_event.jpg',
        title: 'Networking Night',
        date: '12/01/2024',
        venue: 'Grand Hall, Building A',
        description: 'Join us for an evening of networking with industry leaders and peers. Expand your professional circle and gain valuable insights.',
    },
    {
        image: '/assets/coding_workshop.jpg',
        title: 'Coding Workshop',
        date: '12/05/2024',
        venue: 'Tech Lab, Room 204',
        description: 'Hands-on coding workshop focusing on building web applications with React. No prior experience required!',
    },
    {
      image: '/assets/event3.jpg',
      title: 'Event Name 3',
      date: 'MM/DD/YYYY',
      venue: 'Venue 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: '/assets/event4.jpg',
      title: 'Event Name 4',
      date: 'MM/DD/YYYY',
      venue: 'Venue 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: '/assets/event5.jpg',
      title: 'Event Name 5',
      date: 'MM/DD/YYYY',
      venue: 'Venue 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: '/assets/event6.jpg',
      title: 'Event Name 6',
      date: 'MM/DD/YYYY',
      venue: 'Venue 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: '/assets/event7.jpg',
      title: 'Event Name 7',
      date: 'MM/DD/YYYY',
      venue: 'Venue 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: '/assets/event8.jpg',
      title: 'Event Name 8',
      date: 'MM/DD/YYYY',
      venue: 'Venue 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: '/assets/event9.jpg',
      title: 'Event Name 9',
      date: 'MM/DD/YYYY',
      venue: 'Venue 9',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: '/assets/event10.jpg',
      title: 'Event Name 10',
      date: 'MM/DD/YYYY',
      venue: 'Venue 10',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
  ];

  return (
    <div className="events-container">
      <h2 className="events-header">Upcoming Events</h2>
      <div className="events-list">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
