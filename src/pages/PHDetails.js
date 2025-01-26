// TemperatureDetails.js

import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import path as needed
import PlotlyCharts from '../charts/PlotlyChartsSmall';
import './graph.css'; // Import the CSS file for styling
import Weather from './weather';
import logo from '../assets/img/favicon.png';
import { Link } from 'react-router-dom';

function PHDetails() {
  const [phData, setpHData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const phRef = ref(database, 'SensorData'); // Adjust path to your historical data

    const unsubscribe = onValue(
      phRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(entry.timestamp), // Use Date object for formatting
              y: entry.pH !== undefined ? entry.pH : null, // Handle missing Celsius values
            };
          });

          setpHData(formattedData);
        } else {
          setError('No ph data available.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch ph data.');
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const parameterX = phData.map((item) => item.x);
  const parameterY = phData.map((item) => item.y);

  return (
    <div className='analysis-page'>
      {/* Overview Dashboard */}
      <div className='overview-dash'>
        {/* Left Section of Overview */}
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
    <div className="details-container">
      <div className="chart-and-table">
        <div className="chart-container">
          {error ? (
            <p>{error}</p>
          ) : (
            <PlotlyCharts
              parameter="pH" 
              parameterX={parameterX}
              parameterY={parameterY}
              predY={[]}
              predX={[]}
              upperBound={[]}
              lowerBound={[]}
              filterOption={[]} 
              className="water-plot"
              hovertemplate="%{x|%Y-%m-%d %H:%M}: %{y:.2f} mg/L" // Format date and time in hover labels
            />
          )}
        </div>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Date and Time</th>
                <th>potential of Hydrogen (pH)</th>
              </tr>
            </thead>
            <tbody>
              {[...phData].reverse().map((data, index) => (
                <tr key={index}>
                  <td>{data.x ? data.x.toLocaleString() : 'N/A'}</td> {/* Display date and time */}
                  <td>{data.y !== null && data.y !== undefined ? data.y.toFixed(2) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}


export default PHDetails;
