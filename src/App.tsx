import React, { useState } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import { WeatherData } from './types';
import './App.css';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      if (axios.isAxiosError(err)) {
        setError(`Error: ${err.response?.status} - ${err.response?.data.message || err.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherForm onSubmit={fetchWeather} />
      {error && <p className="error">{error}</p>}
      <WeatherDisplay data={weatherData} />
    </div>
  );
};

export default App;

