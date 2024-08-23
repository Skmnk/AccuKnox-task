import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import DashBoard from './pages/DashBoard';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
     
      <Router>
      <NavBar />
        <Routes>
        <Route path="/" element = {<Home />} />

          <Route path="/dashboard" element = {<DashBoard />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
