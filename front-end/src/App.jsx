import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar';
import Home from './pages/Home'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <CustomNavbar />
      <Home />
    </>
  )
}

export default App
