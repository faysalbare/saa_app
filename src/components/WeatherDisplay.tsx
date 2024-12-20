import React from 'react';
import { WeatherData } from '../types';

interface WeatherDisplayProps {
  data: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-display">
      <h2>{data.name}</h2>
      <p>Temperature: {Math.round(data.main.temp - 273.15)}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Conditions: {data.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt="Weather icon"
      />
    </div>
  );
};

export default WeatherDisplay;
