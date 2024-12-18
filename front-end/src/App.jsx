import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar';
import Home from './pages/Home'
import FindRoommates from './pages/FindRoommates';
import Events from './pages/Events';
import ProfilePage from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetails';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { setAuthToken } from './api/api';
import UserProfile from './pages/UserProfile'; // Import the new UserProfile component


// import { useLocation } from 'react-router-dom';
// import { hotjar } from 'react-hotjar';
import HotjarTracker from './Hotjar';


function App() {
  // const [count, setCount] = useState(0)
  const token = localStorage.getItem('jwtToken');
  if (token) {
      setAuthToken(token);
  }

  return (
    <>
      <Router>
        <h1 style={{display: 'none'}}>Campus Pulse</h1>
        <HotjarTracker>
          <CustomNavbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/findroommates" element={<FindRoommates />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
          </Routes>
        </HotjarTracker>
      </Router>
      {/* <Home /> */}
    </>
  )
}

export default App
