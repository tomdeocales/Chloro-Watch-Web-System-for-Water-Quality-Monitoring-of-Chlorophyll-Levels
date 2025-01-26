// App.js

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import AboutChloroWatch from './pages/about-chlorowatch';
import AboutUs from './pages/about-us';
import Water from './pages/water';
import Map from './pages/map';
import Weather from './pages/weather';
import Sidebar from './pages/sidebar';
import Footer from './pages/footer';
import DataAnalysis from './pages/analysis';
import Logger1 from './pages/logger1';
import Data from './pages/logger2';
import TemperatureDetails from './pages/TemperatureDetails'; // Import the TemperatureDetails component
import DissolvedOxygenDetails from './pages/DissolvedOxygenDetails';
import ChlorophyllDetails from './pages/ChlorophyllDetails';
import PHDetails from './pages/PHDetails';
import TurbidityDetails from './pages/TurbidityDetails';

function App() {
  return (
    <div className='main-section'>
      <Router>
        <Sidebar />
        <div className='main-dash'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-chlorowatch" element={<AboutChloroWatch />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/water" element={<Water />} />
            <Route path="/map" element={<Map />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/logger1" element={<Logger1 />} />
            <Route path="/data" element={<Data />} />
            <Route path="/analysis/:labelName" element={<DataAnalysis />} />
            <Route path="/temperature-details" element={<TemperatureDetails />} /> {/* Add this route */}
            <Route path="/dissolvedoxygen-details" element={<DissolvedOxygenDetails />} />
            <Route path="/ph-details" element={<PHDetails />} />
            <Route path="/turbidity-details" element={<TurbidityDetails />} />
            <Route path="/chlorophyll-details" element={<ChlorophyllDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
