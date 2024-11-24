'use strict'

import { fetchApiData } from './fetch.js';
import { obtenerUbicacion, borradorcontenedor } from './geo.js';   

document.addEventListener('DOMContentLoaded', () => {
  // Referencias a los elementos del DOM
  const mainTitle = document.getElementById('mainTitle');
  const checkRainButton = document.getElementById('checkRainButton');
  const searchCityButton = document.getElementById('searchCityButton');
  const cityInput = document.getElementById('cityInput');
  const leftSection = document.getElementById('leftSection');
  const rightSection = document.getElementById('rightSection');
  const resultDiv = document.getElementById('result');
  const restartButton = document.getElementById('restartButton');
  const currentWeatherIcon = document.getElementById('currentWeatherIcon');
  const currentWeatherText = document.getElementById('currentWeatherText');
  const forecastCards = document.getElementById('forecastCards');
  const cityName = document.getElementById('cityName');
  const choiceContainer = document.createElement('div');
  choiceContainer.id = 'choice-container';
  document.body.appendChild(choiceContainer);

  const apiKey = '8688b15c50252ffd91f50c3ca5c1a8bf';  // Tu API key
  const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';  // URL base para la API

  function handleError(error) {
    const errorMessage = encodeURIComponent(error.message || 'Error desconocido');
    window.location.href = `error.html?error=${errorMessage}`;
  }
  
  // Función para obtener los datos del clima
  async function getWeather(lat, lon, city = null) {
    try {
      const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
      const data = await fetchApiData(url);
      console.log(data);

      cityName.textContent = data.city.name || 'Ubicación actual';
      const current = data.list[0];
      currentWeatherIcon.src = `http://openweathermap.org/img/wn/${current.weather[0].icon}.png`;
      currentWeatherText.textContent = `${current.weather[0].description}, ${current.main.temp}°C`;

      forecastCards.innerHTML = '';
      const forecast = data.list.slice(1, 6);
      forecast.forEach(item => {
        const card = document.createElement('div');
        card.className = 'forecastCard';
        card.innerHTML = ` 
          <span>${new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
          <span>${item.weather[0].description}, ${item.main.temp}°C</span>
        `;
        forecastCards.appendChild(card);
      });

      leftSection.style.display = 'none';
      rightSection.style.display = 'none';
      resultDiv.style.display = 'block';
    } catch (error) {
      handleError(error);
    }
  }

  // Manejo del evento para verificar si va a llover
  checkRainButton.addEventListener('click', async () => {
    try {
      const posicion = await obtenerUbicacion(1);  // Geolocalización del usuario
      await getWeather(posicion.latitud, posicion.longitud);
      let bloque = document.getElementById('mainboard');
      bloque.classList.remove('sinresultado');
      bloque.classList.add('conresultado');
    } catch (error) {
      handleError(error);
    }
  });

  // Manejo del evento para buscar el clima por ciudad
  searchCityButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) {
      handleError(new Error('Por favor, introduce una ciudad.'));
      return;
    }

    try {
      const posicion = await obtenerUbicacion(2, city);  // Geolocalización por ciudad
      await getWeather(posicion.latitud, posicion.longitud, city);
    } catch (error) {
      handleError(error);
    }
  });

  // Manejo del evento para reiniciar la vista
  restartButton.addEventListener('click', () => {
    leftSection.style.display = 'flex';
    rightSection.style.display = 'flex';
    resultDiv.style.display = 'none';
    let bloque = document.getElementById('mainboard');
    bloque.classList.add('sinresultado');
    bloque.classList.remove('conresultado');
    borradorcontenedor();  // Llamada a la función de geo.js para borrar el contenedor
  });
});

