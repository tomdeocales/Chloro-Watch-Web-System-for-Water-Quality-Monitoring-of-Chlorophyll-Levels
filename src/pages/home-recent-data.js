import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import path as needed
import waterSvg from '../assets/svg/water.svg';
import temperaturepng from '../assets/img/temperature.png';
import pHSvg from '../assets/svg/ph.svg';
import conductanceSvg from '../assets/svg/conductance.svg';
import chlorophyllSvg from '../assets/svg/chlorophyll.svg';
import turbiditySvg from '../assets/svg/turbidity.svg';
import dissolvedoxygenSvg from '../assets/svg/water-quality.svg';

function Home() {
  const [temperature, setTemperature] = useState(null);
  const [dissolvedoxygen, setDissolvedOxygen] = useState(null);
  const [ph, setpH] = useState(null);
  const [turbidity, setTurbidity] = useState(null);
  const [chlorophyll, setChlorophyll] = useState(null);
  const [error, setError] = useState(null);

  const getStatusClass = (value, min, max) => {
    if (value < min) return 'low';
    if (value > max) return 'high';
    return 'normal';
  };

  const getIndicator = (value, min, max) => {
    if (value < min) return <span className="status-indicator low-indicator">Low</span>;
    if (value > max) return <span className="status-indicator high-indicator">High</span>;
    return <span className="status-indicator normal-indicator">Normal</span>;
  };
  const getChlorophyllStatus = (value, min, max) => {
    if (value < min) {
      return 'oligotrophic';
    } else if (value >= min && value <= max) {
      return 'mesotrophic';
    } else {
      return 'eutrophic';
    }
  };

  const getChlorophyllIndicator = (value, min, max) => {
    if (value < 10) {
      return <span className="status-indicator oligotrophic-indicator">Oligotrophic</span>;
    } else if (value >= 10 && value <= 25) {
      return <span className="status-indicator mesotrophic-indicator">Mesotrophic</span>;
    } else {
      return <span className="status-indicator eutrophic-indicator">Eutrophic</span>;
    }
  };
  useEffect(() => {
    const temperatureRef = ref(database, 'CurrentData');
    const unsubscribe = onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTemperature(data);
      } else {
        console.log('No data available for temperature.');
      }
    }, (error) => {
      setError('Failed to fetch temperature data.');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const phRef = ref(database, 'CurrentData');
    const unsubscribe = onValue(phRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setpH(data);
      } else {
        console.log('No data available for pH.');
      }
    }, (error) => {
      setError('Failed to fetch pH data.');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const dissolvedoxygenRef = ref(database, 'CurrentData');
    const unsubscribe = onValue(dissolvedoxygenRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDissolvedOxygen(data);
      } else {
        console.log('No data available for dissolved oxygen.');
      }
    }, (error) => {
      setError('Failed to fetch dissolved oxygen data.');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const turbidityRef = ref(database, 'CurrentData');
    const unsubscribe = onValue(turbidityRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTurbidity(data);
      } else {
        console.log('No data available for turbidity.');
      }
    }, (error) => {
      setError('Failed to fetch turbidity data.');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const chlorophyllRef = ref(database, 'CurrentPrediction');
    const unsubscribe = onValue(chlorophyllRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setChlorophyll(data);
      } else {
        console.log('No data available for chlorophyll.');
      }
    }, (error) => {
      setError('Failed to fetch chlorophyll data.');
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='hf-analysis-grid'>
      <div className={`hf-analysis-item ${temperature ? getStatusClass(temperature.Temperature, 25, 31) : ''}`}>
        <div className='hf-analyze'>
          <p>Temperature</p>
          <h1>
            {error ? error : temperature ? `${Number(temperature.Temperature).toFixed(1)} °C` : 'Loading...'}
          </h1>
          <img src={temperaturepng} alt='temperature' />
          {temperature && getIndicator(temperature.Temperature, 25, 31)}
        </div>
      </div>

      <div className={`hf-analysis-item ${ph ? getStatusClass(ph.pH, 6.5, 9) : ''}`}>
        <div className='hf-analyze'>
          <p>pH</p>
          <h1>
            {error ? error : ph ? `${Number(ph.pH).toFixed(1)} pH` : 'Loading...'}
          </h1>
          <img src={pHSvg} alt='pH' />
          {ph && getIndicator(ph.pH, 6.5, 9)}
        </div>
      </div>

      <div className={`hf-analysis-item ${dissolvedoxygen ? getStatusClass(dissolvedoxygen.DissolvedOxygen, 5, 1000) : ''}`}>
        <div className='hf-analyze'>
          <p>Dissolved Oxygen</p>
          <h1>
            {error ? error : dissolvedoxygen ? `${Number(dissolvedoxygen.DissolvedOxygen).toFixed(1)} mg/L` : 'Loading...'}
          </h1>
          <img src={dissolvedoxygenSvg} alt='dissolved oxygen' />
          {dissolvedoxygen && getIndicator(dissolvedoxygen.DissolvedOxygen, 5, 1000)}
        </div>
      </div>

      <div className={`hf-analysis-item ${turbidity ? getStatusClass(turbidity.Turbidity, 0, 50) : ''}`}>
        <div className='hf-analyze'>
          <p>Turbidity</p>
          <h1>
            {error ? error : turbidity ? `${Number(turbidity.Turbidity).toFixed(1)} FNU` : 'Loading...'}
          </h1>
          <img src={turbiditySvg} alt='turbidity' />
          {turbidity && getIndicator(turbidity.Turbidity, 0, 50)}
        </div>
      </div>

      <div className={`hf-analysis-item ${chlorophyll ? getChlorophyllStatus(chlorophyll.Predicted_Chlorophyll, 10, 25) : ''}`}>
        <div className='hf-analyze'>
          <p>Chlorophyll</p>
          <h1>
            {error ? error : chlorophyll ? `${Number(chlorophyll.Predicted_Chlorophyll).toFixed(1)} ug/L` : 'Loading...'}
          </h1>
          <img src={chlorophyllSvg} alt='chlorophyll' />
          {chlorophyll && getChlorophyllIndicator(chlorophyll.Predicted_Chlorophyll, 10, 25)}
        </div>
      </div>
    </div>
  );
}

export default Home;
