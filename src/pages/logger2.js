import React, { useEffect } from 'react';
import Weather from './weather';
import logo from '../assets/img/favicon.png';
import Water from '../pages/water';
import { Link } from 'react-router-dom';

function Data() {
  // Set document title and scroll to top on component mount
  useEffect(() => {
    document.title = "Chloro Watch | Data Visualization";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      {/* Overview Dashboard */}
      <div className='overview-dash'>
        {/* Left Section of Overview - University Profile */}
        <div className='over-left'>
          <div className='overview-profile'>
            {/* University Logo */}
            <Link to='/'><img src={logo} alt="lspu-logo"/></Link>
            <span>
              {/* University Name and Campus */}
              <h1>Chloro Watch - Water Quality Monitoring</h1>
              <p>Tadlac Lake</p>
            </span>
          </div>
        </div>
        {/* Right Section of Overview - Weather Component */}
        <div className='over-right'>
          <Weather/>
        </div>
      </div>

      {/* Main Content */}
      <div className='home-page'>
        {/* Water Component */}
        <Water/>
      </div>
    </div>
  );
}

export default Data;
