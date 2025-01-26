// App.js
import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAD-wZBdqqpMrXng0BKFSIiJw9jzL_xzjA",
    authDomain: "lake-d30ad.firebaseapp.com",
    databaseURL: "https://lake-d30ad-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lake-d30ad",
    storageBucket: "lake-d30ad.appspot.com",
    messagingSenderId: "633397665516",
    appId: "1:633397665516:web:9545c24d528da466544fc9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const App = () => {
  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch('http://192.168.18.64/'); // Adjust the URL if necessary
        const text = await response.text();
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, 'text/html');
        const temperature = htmlDocument.getElementById('mrdiy_value').innerText;

        // Send temperature to Firebase
        db.ref('temperature').set({
          value: temperature
        });
        
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    const intervalId = setInterval(fetchTemperature, 60000); // Fetch every 60 seconds

    // Fetch immediately on mount
    fetchTemperature();

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h1>Temperature Data</h1>
      {/* You can display more UI elements here */}
    </div>
  );
};

export default App;
