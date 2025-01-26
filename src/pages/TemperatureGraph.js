import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import path as needed
import PlotlyCharts from '../charts/PlotlyChartsSmall';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './graph.css'; // Import the CSS file

function TemperatureGraph() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [dissolvedoxygenData, setDissolvedOxygenData] = useState([]);
  const [phData, setpHData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const temperatureRef = ref(database, 'TemperatureData'); // Adjust path to your historical data

    const unsubscribe = onValue(
      temperatureRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Map data to include timestamps and format them for the graph
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(entry.timestamp), // Convert timestamp to Date object for x values
              y: entry.Celsius,             // Celsius value as y values
            };
          });

          setTemperatureData(formattedData);
        } else {
          setError('No temperature data available.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch temperature data.');
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    const dissolvedoxygenRef = ref(database, 'DissolvedOxygenData'); // Adjust path to your historical data

    const unsubscribe = onValue(
      dissolvedoxygenRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Map data to include timestamps and format them for the graph
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(entry.timestamp), // Convert timestamp to Date object for x values
              y: entry.Dissolved_Oxygen,    // Celsius value as y values
            };
          });

          setDissolvedOxygenData(formattedData);
        } else {
          setError('No dissolvedoxygen data available.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch dissolvedoxygen data.');
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    const phRef = ref(database, 'pHData'); // Adjust path to your historical data

    const unsubscribe = onValue(
      phRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Map data to include timestamps and format them for the graph
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(entry.timestamp), // Convert timestamp to Date object for x values
              y: entry.pH,    // Celsius value as y values
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

  const parameterX = temperatureData.map((item) => item.x); // x values (timestamps)
  const parameterY = temperatureData.map((item) => item.y); // y values (temperature)
  const parameterX1 = dissolvedoxygenData.map((item) => item.x); 
  const parameterY1 = dissolvedoxygenData.map((item) => item.y);
  const parameterX2 = phData.map((item) => item.x); 
  const parameterY2 = phData.map((item) => item.y);

  const handleViewClick = () => {
    navigate('/temperature-details'); // Navigate to the detailed temperature page
  };
  const handleViewClick1 = () => {
    navigate('/dissolvedoxygen-details'); // Navigate to the detailed temperature page
  };
  const handleViewClick2 = () => {
    navigate('/ph-details'); // Navigate to the detailed temperature page
  };

  return (
    <div className="graphs-container">
      <div className="graph-box">
        <span className="view-text" onClick={handleViewClick}>View</span>
        {error ? (
          <p>{error}</p>
        ) : (
          <PlotlyCharts
            parameter="Temperature" 
            parameterX={parameterX} 
            parameterY={parameterY} 
            filterOption="None"
            className="temperature-plot"
            hovertemplate="%{x}: %{y:.2f} °C"
          />
        )}
      </div>
      <div className="graph-box">
      <span className="view-text" onClick={handleViewClick2}>View</span>
        {/* Placeholder for pH Graph */}
        <PlotlyCharts
          parameter="pH"
          parameterX={parameterX2}
          parameterY={parameterY2}
          filterOption="None"
          className="ph-plot"
          hovertemplate="%{x}: %{y:.2f} mg/L"
        />
      </div>
      <div className="graph-box">
        <span className="view-text" onClick={handleViewClick1}>View</span>
        {error ? (
          <p>{error}</p>
        ) : (
          <PlotlyCharts
            parameter="Dissolved Oxygen" 
            parameterX={parameterX1} 
            parameterY={parameterY1} 
            filterOption="None"
            className="dissolvedoxygen-plot"
            hovertemplate="%{x}: %{y:.2f} mg/L"
          />
        )}
      </div>
      <div className="graph-box">
        <span className="view-text" onClick={() => handleViewClick('Total Phosphorus')}>View</span>
        {/* Placeholder for Total Phosphorus Graph */}
        <PlotlyCharts
          parameter="Total Phosphorus"
          parameterX={[]}
          parameterY={[]}
          filterOption="None"
          className="total-phosphorus-plot"
        />
      </div>
    </div>
  );
}

export default TemperatureGraph;