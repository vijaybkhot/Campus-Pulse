import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FindEvents from './components/FindEvents'; // Placeholder
import FindRoommate from './components/FindRoommate'; // Placeholder

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<FindEvents />} />
        <Route path="/roommate" element={<FindRoommate />} />
      </Routes>
    </Router>
  );
}

export default App;
