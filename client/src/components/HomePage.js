import React from 'react';
import Navbar from './Navbar';
import FindFriends from './FindFriends';
import News from './News';  // Import News component
import { Link } from 'react-router-dom';  // For routing

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="main-container">
        {/* Left Section: Your Next Steps */}
        <div className="left-section">
          <div className="section-wrapper">
            <h2 className="section-title">Your Next Steps</h2>
            <div className="card card-container">
              <h3>FIND A ROOMMATE</h3>
              <Link to="/find-roommate">
                <button className="btn-primary card-btn">GO</button>
              </Link>
            </div>
            <div className="card card-container">
              <h3>DISCOVER NEW EVENTS</h3>
              <Link to="/events">
                <button className="btn-primary card-btn">GO</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Section: News */}
        <div className="middle-section">
          <div className="section-wrapper">
            <h2 className="section-title">See What's New</h2>
            <div className="news-container">
              <News /> {/* Display multiple news articles */}
              <News />
            </div>
          </div>
        </div>

        {/* Right Section: Find New Friends */}
        <div className="right-section">
          <div className="section-wrapper">
            <h3 className="section-title">Find new friends</h3>
            <FindFriends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
