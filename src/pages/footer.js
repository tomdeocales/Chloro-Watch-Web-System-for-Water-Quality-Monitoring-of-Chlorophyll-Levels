import React from 'react';
import Weather from './weather';
import footerLogo from '../assets/img/favicon.png';
import { Link } from 'react-router-dom';

/**
 * Footer component for the application.
 * Provides navigation links, information about the project, and copyright details.
 *
 * @returns {JSX.Element} Footer component.
 */
function Footer() {
  return (
    <footer>
      {/* Project Information Section */}
      <div className='footer-item'>
        <div className='footer-flex'>
          {/* Left Section - Project Logo */}
          <div className='footer-left'>
          <Link to='/'><img src={footerLogo} alt='footer-logo' /></Link>
          </div>
          {/* Right Section - Project Title and Description */}
          <div className='footer-right'>
            <h1>Chloro Watch</h1>
            <p>
              Chlorophyll Monitoring
              (Chloro Watch): <br></br>Integration of Chlorophyll Soft Sensor (AquaSense)
            </p>
          </div>
        </div>
      </div>

      <div className='footer-item'>
        {/* Security Section */}
        <h1></h1>
        <Link to=""></Link>
        <Link to=""></Link>
      </div>


      {/* Navigation Links Sections */}
      <div className='footer-item'>
        {/* Links Section */}
        <h1>Links</h1>
        <Link to="/">Home</Link>
        <Link to="/about-chlorowatch">About Chloro Watch</Link>
        <Link to="/about-us">About Us</Link>
      </div>

      <div className='footer-item'>
        {/* Analysis Section */}
        <h1>Analysis</h1>
        
        <Link to="/temperature-details">Temperature</Link>
        <Link to="/ph-details">pH</Link>
        <Link to="/dissolvedoxygen-details">Dissolved Oxygen</Link>
        <Link to="/turbidity-details">Turbidity</Link>
        {/*<Link to="/analysis/specific-conductance">Specific Conductance</Link>*/}
        <Link to="/chlorophyll-details">Chlorophyll</Link>
        {/*<Link to="/analysis/nitrate">Nitrate</Link>*/}
        {/*<Link to="/analysis/turbidity">Turbidity</Link>*/}
      </div>


      {/* Copyright Section */}
      <div className='footer-copyright'>
        © 2024 Capstone Presented by{' Bryan Valencia & Tom Deocales'}
      </div>
    </footer>
  );
}

export default Footer;
