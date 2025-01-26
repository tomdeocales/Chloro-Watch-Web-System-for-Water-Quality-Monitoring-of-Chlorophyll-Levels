import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { lakeData } from '../maps/data';

/**
 * HomeMap component displays a map with lake data and overlays a color-coded polygon based on water quality predictions.
 *
 * @returns {JSX.Element} HomeMap component.
 */
function HomeMap() {
  // State hook to store predicted water quality data
  const [predictedWaterQuality, setPredictedWaterQuality] = useState([]);

  // Fetch predicted water quality data from the API on component mount
  useEffect(() => {
    const fetchWqiPrediction = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/wqipreds');
        setPredictedWaterQuality(response.data);
      } catch (error) {
        console.error('Error fetching water quality prediction data:', error);
      }
    };

    fetchWqiPrediction();
  }, []);

  // Helper function to extract relevant prediction data
  const extractPredictionData = (dataArray) => {
    return dataArray.map((data) => ({
      Prediction: data.Prediction,
      PredScore: data.PredScore,
    }));
  };
  const predictionData = extractPredictionData(predictedWaterQuality);
  const waterQualityPrediction = predictionData.length > 0 ? predictionData[0].Prediction : '';

  // Helper function to map prediction to color
  const mapPredictionToColor = (prediction) => {
    switch (prediction) {
      case 'Poor':
        return '#ff0000';
      case 'Good':
        return '#ffff00';
      case 'Excellent':
        return '#00ff00';
      default:
        return '#000000';
    }
  };

  // Map center and colors for polygons
  const center = [14.1824, 121.2061];
  const colors = ['#1f78b4', mapPredictionToColor(waterQualityPrediction), '#1f78b4'];

  return (
    <MapContainer
      center={center}
      zoom={15.5}
    >
      {/* Base Map Layer */}
      <TileLayer
        url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=k9Qg7CHztc7z9ToBJnNA"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {/* Overlay Polygons for Lake Data */}
      {lakeData.features.map((state, index) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

        return (
          <Polygon
            key={index}
            pathOptions={{
              fillColor: colors[index % colors.length], // Cycling through colors
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white',
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: '',
                  fillColor: '#BD0026',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: '3',
                  color: 'white',
                  fillColor: colors[index % colors.length],
                });
              },
              click: (e) => {
                // Handle click event if needed
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}

export default HomeMap;
