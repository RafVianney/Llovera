'use strict'

export async function fetchWeatherData(lat, lon) {
  const apiKey = '984a4dd4217d81027cfe5c6db307a6e7';
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la API');

    return await response.json();
  } catch (error) {
    console.error('Error al obtener datos meteorológicos:', error);
    throw error;
  }
}
