import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/stevens-logo.png" alt="Stevens Logo" style={{ width: '50px' }} />
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/roommate">Find Roommate</Link></li>
      </ul>
      <input type="text" placeholder="Search" />
      <div className="profile">
        <img src="/profile-pic.png" alt="Profile" style={{ width: '50px', borderRadius: '50%' }} />
      </div>
    </nav>
  );
};

export default Navbar;
