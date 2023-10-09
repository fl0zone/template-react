import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import PlanetInfo from './PlanetInfo';
import Carousel from './carousel';
import './App.css';
import Navbar from './Navbar';
import SpaceTourismBooking from './SpaceTravelBooking.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './About';
import RegistrationComponent from './components/RegistrationComponent';

import LoginComponent from "./components/LoginComponent";
import { auth } from './config/firebase.js';
import Explore from './Explore';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  const [selectedPlanet, setSelectedPlanet] = React.useState(null);

  const handleSelectPlanet = (planetKey) => {
    if (selectedPlanet === planetKey) {
      setSelectedPlanet(null);
    } else {
      setSelectedPlanet(planetKey);
    }
  };

  return (
    <Router>
      <div>
        <Navbar onSelectPlanet={handleSelectPlanet} />
      </div>
      <div className="container">
        {/* <div className="card text-center" style={{ borderRadius: '50px' }}>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div> */}

        <Routes>
          <Route path='/register' element={<RegistrationComponent />} />
          <Route path="/" element={<Carousel />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/booking" element={<SpaceTourismBooking />} />
          <Route path="/planet-info/:planetName" element={<div><PlanetInfo /></div>} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
