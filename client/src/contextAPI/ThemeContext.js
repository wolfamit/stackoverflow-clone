import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  const [isDaytime, setIsDaytime] = useState(() => {
    const storedTheme = localStorage.getItem('isDarkMode');
    return storedTheme ? JSON.parse(storedTheme) : true; // Default to daytime if no value in localStorage
  });

  // Use geolocation to determine if it's daytime or nighttime based on the location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apikey = process.env.REACT_APP_WEATHER_API_KEY;
      const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${latitude},${longitude}`;
      
      fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
          const isDay = data?.current.is_day;
          localStorage.setItem('isDarkMode', JSON.stringify(isDay));
          setIsDaytime(isDay);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDaytime, setIsDaytime }}>
      {children}
    </ThemeContext.Provider>
  );
};
