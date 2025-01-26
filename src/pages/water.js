import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlotlyCharts from '../charts/PlotlyChartsSmall';
import BigPlotlyCharts from '../charts/PlotlyCharts';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

/**
 * Water component fetches water quality and prediction data, allowing users to analyze and visualize the data.
 *
 * @returns {JSX.Element} Water component.
 */
function Water() {
  const [data, setData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [predictedDataTwo, setPredictedDataTwo] = useState([]);
  const [predictedQuality, setPredictedWaterQuality] = useState([]);
  const [filterOption, setFilterOption] = useState('Year');
  const [selectedAnalysis, setSelectedAnalysis] = useState('All');
  const prevFilterOption = useRef(filterOption);
  const [temperatureData, setTemperatureData] = useState([]);
  const [dissolvedoxygenData, setDissolvedOxygenData] = useState([]);
  const [phData, setpHData] = useState([]);
  const [turbidityData, setTurbidityData] = useState([]);
  const [chlorophyllData, setChlorophyllData] = useState([]);
  const [forecastedData, setForecastedData] = useState([]);
  const [upperBound, setUpperBound] = useState([]);
  const [lowerBound, setLowerBound] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const temperatureRef = ref(database, 'SensorData'); // Adjust path to your historical data

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
              y: entry.Temperature,             // Celsius value as y values
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
    const dissolvedoxygenRef = ref(database, 'SensorData'); // Adjust path to your historical data

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
              y: entry.DissolvedOxygen,    // Celsius value as y values
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
    const phRef = ref(database, 'SensorData'); // Adjust path to your historical data

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

  useEffect(() => {
    const turbidityRef = ref(database, 'SensorData'); // Adjust path to your historical data

    const unsubscribe = onValue(
      turbidityRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Map data to include timestamps and format them for the graph
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(entry.timestamp), // Convert timestamp to Date object for x values
              y: entry.Turbidity,             // Celsius value as y values
            };
          });

          setTurbidityData(formattedData);
        } else {
          setError('No turbidity data available.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch turbidity data.');
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    const chlorophyllRef = ref(database, 'Predictions'); // Adjust path to your historical data

    const unsubscribe = onValue(
      chlorophyllRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Map data to include timestamps and format them for the graph
          const formattedData = Object.keys(data).map((key) => {
            const entry = data[key];
            return {
              x: new Date(entry.timestamp), // Convert timestamp to Date object for x values
              y: entry.Predicted_Chlorophyll,             // Celsius value as y values
            };
          });

          setChlorophyllData(formattedData);
        } else {
          setError('No turbidity data available.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch turbidity data.');
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
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


  const parameterX0 = temperatureData.map((item) => item.x); // x values (timestamps)
  const parameterY0 = temperatureData.map((item) => item.y); // y values (temperature)
  const parameterX1 = phData.map((item) => item.x); 
  const parameterY1 = phData.map((item) => item.y);
  const parameterX2 = dissolvedoxygenData.map((item) => item.x); 
  const parameterY2 = dissolvedoxygenData.map((item) => item.y);
  const parameterX3 = turbidityData.map((item) => item.x); 
  const parameterY3 = turbidityData.map((item) => item.y);
  const parameterX4 = chlorophyllData.map((item) => item.x); 
  const parameterY4 = chlorophyllData.map((item) => item.y);
  

  /**
   * Handles change in filter option.
   *
   * @param {Object} e - Event object.
   */
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  /**
   * Handles change in selected analysis.
   *
   * @param {Object} e - Event object.
   */
  const handleAnalysisChange = (e) => {
    setSelectedAnalysis(e.target.value);
  };

  return (
    <div className='analysis-header'>
      <div className='flex-header'>
        {/* Dropdown for selecting time range */}
        <div className='header-inputs'>
          <span>Filter by: </span>
        </div>

        {/* Dropdown for selecting analysis type */}
        <div className='header-inputs'>
          <select onChange={handleAnalysisChange} value={selectedAnalysis}>
            <option>All</option>
            <option>Temperature</option>
            <option>pH</option>
            <option>Dissolved Oxygen</option>
            <option>Turbidity</option>
            <option>Chlorophyll</option>
          </select>
        </div>
      </div>

      {selectedAnalysis === 'All' ? (
        <div className='data-analysis'>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Temperature</h1>
                <Link to='/temperature-details'>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={[]}
                    parameter=''
                    parameterX={parameterX0}
                    parameterY={parameterY0}
                    predY={[]}
                    predX={[]}
                    upperBound={[]}
                    lowerBound={[]}
                    filterOption={[filterOption]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>pH</h1>
                <Link to="/ph-details">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={[]}
                    paramater="pH"
                    parameterX={parameterX1}
                    parameterY={parameterY1}
                    predY={[]}
                    predX={[]}
                    upperBound={[]}
                    lowerBound={[]}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Dissolved Oxygen</h1>
                <Link to="/dissolvedoxygen-details">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={[]}
                    paramater="Dissolved Oxygen"
                    parameterX={parameterX2}
                    parameterY={parameterY2}
                    predY={[]}
                    predX={[]}
                    upperBound={[]}
                    lowerBound={[]}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Turbidity</h1>
                <Link to="/turbidity-details">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={[]}
                    paramater="Turbidity"
                    parameterX={parameterX3}
                    parameterY={parameterY3}
                    predY={[]}
                    predX={[]}
                    upperBound={[]}
                    lowerBound={[]}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Chlorophyll</h1>
                <Link to="/chlorophyll-details">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    parameter="Chlorophyll" 
                    parameterX={chlorophyllData.map(item => item.x)}
                    parameterY={chlorophyllData.map(item => item.y)}
                    predY={forecastedData.map(item => item.y)}
                    predX={forecastedData.map(item => item.x)}
                    upperBound={upperBound.map(item => item.y)}
                    lowerBound={lowerBound.map(item => item.y)}
                    filterOption={[]} // Format date and time in hover labels
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="whole-data-analyze">
          <p>
            {selectedAnalysis}
          </p>
          {selectedAnalysis === 'Temperature' && (
            <div className='graph'>
              <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {/* Component for rendering big Plotly charts */}
            <BigPlotlyCharts
              data={[]}
              parameter={[]}
              parameterX={parameterX0}
              parameterY={parameterY0}
              predY={[]}
              predX={[]}
              upperBound={[]}
              lowerBound={[]}
              filterOption={[]}
            />
            </div>
          </div>
          )}
          {selectedAnalysis === 'pH' && (
            <div className='graph'>
            {/* Component for rendering big Plotly charts */}
            <BigPlotlyCharts
              data={[]}
              parameter={[]}
              parameterX={parameterX1}
              parameterY={parameterY1}
              predY={[]}
              predX={[]}
              upperBound={[]}
              lowerBound={[]}
              filterOption={filterOption}
            />
          </div>
          )}
          {selectedAnalysis === 'Dissolved Oxygen' && (
            <div className='graph'>
            {/* Component for rendering big Plotly charts */}
            <BigPlotlyCharts
              data={[]}
              parameter={[]}
              parameterX={parameterX2}
              parameterY={parameterY2}
              predY={[]}
              predX={[]}
              upperBound={[]}
              lowerBound={[]}
              filterOption={filterOption}
            />
          </div>
          )}
          {selectedAnalysis === 'Turbidity' && (
            <div className='graph'>
            {/* Component for rendering big Plotly charts */}
            <BigPlotlyCharts
              data={[]}
              parameter={[]}
              parameterX={parameterX3}
              parameterY={parameterY3}
              predY={[]}
              predX={[]}
              upperBound={[]}
              lowerBound={[]}
              filterOption={filterOption}
            />
          </div>
          )}
          {selectedAnalysis === 'Chlorophyll' && (
            <div className='graph'>
            {/* Component for rendering big Plotly charts */}
            <BigPlotlyCharts
              parameter="Chlorophyll" 
              parameterX={chlorophyllData.map(item => item.x)}
              parameterY={chlorophyllData.map(item => item.y)}
              predY={forecastedData.map(item => item.y)}
              predX={forecastedData.map(item => item.x)}
              upperBound={upperBound.map(item => item.y)}
              lowerBound={lowerBound.map(item => item.y)}
              filterOption={[]} // Format date and time in hover labels
            />
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Water;
