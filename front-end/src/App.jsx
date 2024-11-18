import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar';
import Home from './pages/Home'
import FindRoommates from './pages/FindRoommates';
import Events from './pages/Events';
import ProfilePage from './pages/Profile';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/findroommates" element={<FindRoommates />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Router>
      {/* <Home /> */}
    </>
  )
}

export default App
