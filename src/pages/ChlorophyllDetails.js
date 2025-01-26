import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import path as needed
import PlotlyCharts from '../charts/PlotlyChartsSmall';
import './graph.css'; // Import the CSS file for styling
import Weather from './weather';
import logo from '../assets/img/favicon.png';
import { Link } from 'react-router-dom';

function ChlorophyllDetails() {
  const [chlorophyllData, setChlorophyllData] = useState([]);
  const [forecastedData, setForecastedData] = useState([]);
  const [upperBound, setUpperBound] = useState([]);
  const [lowerBound, setLowerBound] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const chlorophyllRef = ref(database, 'Predictions');
    const unsubscribe = onValue(
      chlorophyllRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(entry.timestamp),
              y: entry.Predicted_Chlorophyll,
            };
          });
          setChlorophyllData(formattedData);
        } else {
          setError('No chlorophyll data available.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch chlorophyll data.');
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const forecastedRef = ref(database, 'Predictions');
    const unsubscribe = onValue(
      forecastedRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(new Date(entry.timestamp).getTime() + 3 * 60 * 60 * 1000), // 3 hours ahead
              y: entry.Forecasted_Chlorophyll,
            };
          });
          setForecastedData(formattedData);
        } else {
          setError('No forecasted data available.');
        }
      },
      (error) => {
        console.error('Error fetching forecasted data:', error);
        setError('Failed to fetch forecasted data.');
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const upperBoundRef = ref(database, 'Predictions');
    const unsubscribe = onValue(
      upperBoundRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(new Date(entry.timestamp).getTime() + 3 * 60 * 60 * 1000),
              y: entry.Upper_Bound_Chlorophyll,
            };
          });
          setUpperBound(formattedData);
        }
      },
      (error) => {
        console.error('Error fetching upper bound data:', error);
        setError('Failed to fetch upper bound data.');
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const lowerBoundRef = ref(database, 'Predictions');
    const unsubscribe = onValue(
      lowerBoundRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(new Date(entry.timestamp).getTime() + 3 * 60 * 60 * 1000),
              y: entry.Lower_Bound_Chlorophyll,
            };
          });
          setLowerBound(formattedData);
        }
      },
      (error) => {
        console.error('Error fetching lower bound data:', error);
        setError('Failed to fetch lower bound data.');
      }
    );
    return () => unsubscribe();
  }, []);

  // Combine recent and forecasted data into one array for table rendering
  const combinedData = chlorophyllData.map((recentData, index) => {
    const forecastData = forecastedData[index] || {};
    const upper = upperBound[index] ? upperBound[index].y : null;
    const lower = lowerBound[index] ? lowerBound[index].y : null;

    return {
      recent: recentData,
      forecasted: forecastData,
      upperBound: upper,
      lowerBound: lower,
    };
  });

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
          <Weather />
        </div>
      </div>

      <div className="details-container">
        <div className="chart-and-table">
          <div className="chart-container">
            {error ? (
              <p>{error}</p>
            ) : (
              <PlotlyCharts
                parameter="Chlorophyll" 
                parameterX={chlorophyllData.map(item => item.x)}
                parameterY={chlorophyllData.map(item => item.y)}
                predY={forecastedData.map(item => item.y)}
                predX={forecastedData.map(item => item.x)}
                upperBound={upperBound.map(item => item.y)}
                lowerBound={lowerBound.map(item => item.y)}
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
                  <th>Recent</th>
                  <th>Prediction</th>
                  <th>Upper Bound</th>
                  <th>Lower Bound</th>
                </tr>
              </thead>
                <tbody>
                  {[...combinedData].reverse().map((data, index) => (
                    <React.Fragment key={index}>
                      {/* Render Recent Data */}
                      <tr>
                        <td>{data.recent.x ? data.recent.x.toLocaleString() : 'N/A'}</td>
                        <td>{data.recent.y !== null && data.recent.y !== undefined ? data.recent.y.toFixed(2) : 'N/A'}</td>
                        <td>{data.forecasted.y !== null && data.forecasted.y !== undefined ? data.forecasted.y.toFixed(2) : 'N/A'}</td>
                        <td>{data.upperBound !== null && data.upperBound !== undefined ? data.upperBound.toFixed(2) : 'N/A'}</td>
                        <td>{data.lowerBound !== null && data.lowerBound !== undefined ? data.lowerBound.toFixed(2) : 'N/A'}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChlorophyllDetails;
