import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Weather from './weather';
import logo from '../assets/img/favicon.png';
import PlotlyCharts from '../charts/PlotlyChartsSmall';

/**
 * DataAnalysis component for visualizing and analyzing environmental data.
 * Fetches data from an API, performs data analysis, and displays the results.
 *
 * @returns {JSX.Element} DataAnalysis component.
 */
const DataAnalysis = () => {
  // State hooks for data storage
  const [data, setData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [predictedDataTwo, setPredictedDataTwo] = useState([]);
  const [filterOption, setFilterOption] = useState('Year');

  // Event handler for filter change
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  // Fetch data from API on component mount
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter');
        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSecondData = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/loggertwos');
        setSecondData(response.data);
      } catch (error) {
        console.error('Error fetching second data:', error);
      }
    };

    const fetchPrediction = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/preds');
        setPredictedData(response.data);
      } catch (error) {
        console.error('Error fetching prediction data:', error);
      }
    };

    const fetchSecondPrediction = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/predstwo');
        setPredictedDataTwo(response.data);
      } catch (error) {
        console.error('Error fetching second prediction data:', error);
      }
    };

    // Execute all fetch functions
    fetchPrediction();
    fetchData();
    fetchSecondData();
    fetchSecondPrediction();
  }, []);

  // Helper function to extract data from an array based on a key
  const extractData = (dataArray, key) => {
    return dataArray.map((data) => data[key]);
  };

  // Extracted data arrays
  const date = extractData(data, 'Date');
  const temp = extractData(data, 'Temperature');
  const ph = extractData(data, 'PH');
  const SPCond = extractData(data, 'SPCond');
  const CHL = extractData(secondData, 'CHL');
  const NTR = extractData(data, 'NITRATE');
  const TURB = extractData(data, 'TURBIDITY');

  // Extracted temperature data arrays
  const predDate = extractData(predictedData, 'Date');
  const predTemp = extractData(predictedData, 'temp_pred');
  const upperTemp = extractData(predictedData, 'temp_upper');
  const lowerTemp = extractData(predictedData, 'temp_lower');

  // Extracted pH data arrays
  const predPh = extractData(predictedData, 'ph_pred');
  const upperPh = extractData(predictedData, 'ph_upper');
  const lowerPh = extractData(predictedData, 'ph_lower');

  // Extracted specific conductance data arrays
  const predSc = extractData(predictedData, 'sc_pred');
  const upperSc = extractData(predictedData, 'sc_upper');
  const lowerSc = extractData(predictedData, 'sc_lower');

  // Extracted chlorophyll data arrays
  const predCl = extractData(predictedDataTwo, 'cl_pred');
  const upperCl = extractData(predictedDataTwo, 'cl_upper');
  const lowerCl = extractData(predictedDataTwo, 'cl_lower');

  // Extracted nitrate data arrays
  const predNt = extractData(predictedData, 'nt_pred');
  const upperNt = extractData(predictedData, 'nt_upper');
  const lowerNt = extractData(predictedData, 'nt_lower');

  // Extracted turbidity data arrays
  const predTurb = extractData(predictedData, 'turb_pred');
  const upperTurb = extractData(predictedData, 'turb_upper');
  const lowerTurb = extractData(predictedData, 'turb_lower');

  // Array of label configurations
  const labelsArray = [
    { 
      param: 'water-quality', 
      indicator: 'Water Quality',
      dataKey: 'Date',
    },
    { 
      param: 'temperature', 
      indicator: 'Temperature',
      date: 'Date',
      dataKey: 'Temperature',
      predKey: 'temp_pred',
      upperKey: 'temp_upper',
      lowerKey: 'temp_lower',
    },
    { 
      param: 'ph', 
      indicator: 'pH',
      date: 'Date',
      dataKey: 'PH',
      predKey: 'ph_pred',
      upperKey: 'ph_upper',
      lowerKey: 'ph_lower',
    },
    { 
      param: 'specific-conductance', 
      indicator: 'Specific Conductance',
      date: 'Date',
      dataKey: 'SPCond',
      predKey: 'sc_pred',
      upperKey: 'sc_upper',
      lowerKey: 'sc_lower',
    },
    { 
      param: 'chlorophyll', 
      indicator: 'Chlorophyll',
      date: 'Date',
      dataKey: 'CHL',
      predKey: 'cl_pred',
      upperKey: 'cl_upper',
      lowerKey: 'cl_lower',
    },
    { 
      param: 'nitrate', 
      indicator: 'Nitrate',
      date: 'Date',
      dataKey: 'NITRATE',
      predKey: 'nt_pred',
      upperKey: 'nt_upper',
      lowerKey: 'nt_lower',
    },
    { 
      param: 'turbidity', 
      indicator: 'Turbidity',
      date: 'Date',
      dataKey: 'TURBIDITY',
      predKey: 'turb_pred',
      upperKey: 'turb_upper',
      lowerKey: 'turb_lower',
    }
  ];

  // Get the parameter from the URL
  const { labelName } = useParams();

  // Find the label that matches the parameter
  const selectedLabel = labelsArray.find(label => label.param === labelName);

  // Extract data arrays based on the selected label
  const dataDate = extractData(data, selectedLabel.dataKey);
  const recentData = extractData(secondData, selectedLabel.dataKey);
  const predData = extractData(predictedData, selectedLabel.predKey);
  const upperBound = extractData(predictedData, selectedLabel.upperKey);
  const lowerBound = extractData(predictedData, selectedLabel.lowerKey);

  useEffect(() => {
    // Set document title based on the selected label
    document.title = `${selectedLabel.indicator} | Laguna State Polytechnic University`;
  }, []);

  return (
    <div className='analysis-page'>
      {/* Overview Dashboard */}
      <div className='overview-dash'>
        {/* Left Section of Overview */}
        <div className='over-left'>
          <div className='overview-profile'>
            {/* University Logo */}
            <img src={logo} alt="lspu-logo"/>
            <span>
              {/* University Name and Campus */}
              <h1>ChloroWatch</h1>
              <p>Laguna State Polytechnic University - Los Baños Campus</p>
            </span>
          </div>
        </div>
        {/* Right Section of Overview - Weather Component */}
        <div className='over-right'>
          <Weather/>
        </div>
      </div>

      {/* Conditional Rendering Based on Selected Label */}
      {selectedLabel ? (
        <div className='analysis-flex'>
          {/* Left Section - Data Analysis Graph */}
          <div className='analysis-left'>
            <div className='analysis-graph'>
              <div className='analysis-graph-flex'>
                {/* Selected Indicator Title and Filter Options */}
                <h1>{selectedLabel ? selectedLabel.indicator : 'null'}</h1>
                <select onChange={handleFilterChange} value={filterOption}>
                  <option>Day</option>
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>
              </div>
              {/* PlotlyCharts Component for Visualization */}
              <PlotlyCharts
                data={data}
                parameter={selectedLabel.indicator}
                parameterX={date}
                parameterY={extractData(data, selectedLabel.dataKey)}
                predY={extractData(predictedData, selectedLabel.predKey)}
                predX={extractData(predictedData, 'Date')}
                upperBound={extractData(predictedData, selectedLabel.upperKey)}
                lowerBound={extractData(predictedData, selectedLabel.lowerKey)}
                filterOption={filterOption}
                className='plotly-graph'
              />
            </div>
          </div>

          {/* Right Section - Data Table */}
          <div className='analysis-right'>
            <div className='table-div'>
              {/* Table Header */}
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Recent</th>
                    <th>Prediction</th>
                    <th>Upper Bound</th>
                    <th>Lower Bound</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Rows */}
                  {date.map((date, index) => (
                    <tr key={index}>
                      <td>{date}</td>
                      {selectedLabel.indicator === 'Water Quality' && (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}
                      {selectedLabel.indicator === 'Temperature' && (
                        <>
                          <td>{temp[index]}</td>
                          <td>{predTemp[index]}</td>
                          <td>{upperTemp[index]}</td>
                          <td>{lowerTemp[index]}</td>
                        </>
                      )}
                      {selectedLabel.indicator === 'pH' && (
                        <>
                          <td>{ph[index]}</td>
                          <td>{predPh[index]}</td>
                          <td>{upperPh[index]}</td>
                          <td>{lowerPh[index]}</td>
                        </>
                      )}
                      {selectedLabel.indicator === 'Specific Conductance' && (
                        <>
                          <td>{SPCond[index]}</td>
                          <td>{predSc[index]}</td>
                          <td>{upperSc[index]}</td>
                          <td>{lowerSc[index]}</td>
                        </>
                      )}
                      {selectedLabel.indicator === 'Chlorophyll' && (
                        <>
                          <td>{CHL[index]}</td>
                          <td>{predCl[index]}</td>
                          <td>{upperCl[index]}</td>
                          <td>{lowerCl[index]}</td>
                        </>
                      )}
                      {selectedLabel.indicator === 'Nitrate' && (
                        <>
                          <td>{NTR[index]}</td>
                          <td>{predNt[index]}</td>
                          <td>{upperNt[index]}</td>
                          <td>{lowerNt[index]}</td>
                        </>
                      )}
                      {selectedLabel.indicator === 'Turbidity' && (
                        <>
                          <td>{TURB[index]}</td>
                          <td>{predTurb[index]}</td>
                          <td>{upperTurb[index]}</td>
                          <td>{lowerTurb[index]}</td>
                        </>
                      )}
                      {/* Add additional conditions for other indicators if needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
    // Displayed if selectedLabel is not found
    <p className='analysis-not-found'>Label not found</p>
  )}
</div>
  );
};

export default DataAnalysis;
