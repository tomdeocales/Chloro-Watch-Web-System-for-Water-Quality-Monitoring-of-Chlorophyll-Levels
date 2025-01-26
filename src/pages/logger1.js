import React, { useEffect } from 'react';
import Weather from './weather';
import logo from '../assets/img/favicon.png';
import Water from '../pages/water';

function Logger1() {
  // Set document title and scroll to top on component mount
  useEffect(() => {
    document.title = "Logger 1 | Laguna State Polytechnic University";
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
            <img src={logo} alt="lspu-logo"/>
            <span>
              {/* University Name and Campus */}
              <h1>Chloro Watch</h1>
              <p>Laguna State Polytechnic University - Los Baños Campus</p>
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
        {/*<Water/> is for logger two only, you can create a new water component for logger 1*/}
      </div>
    </div>
  );
}

export default Logger1;
