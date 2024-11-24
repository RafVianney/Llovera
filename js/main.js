'use strict'

import { fetchApiData } from "./fetch.js";
import { obtenerUbicacion } from "./geo.js";
import { handleSearchCity } from './searchcity.js';
const apiKey = "8688b15c50252ffd91f50c3ca5c1a8bf";

const button = document.getElementById("getLocationButton");
button.addEventListener("click", async function () {
  const modo = 1;
  const ciudad = "madrid";
  const location = await obtenerUbicacion(modo, ciudad);
  const lat = location.latitud;
  const lon = location.longitud;
 
  let urlcode =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;
  const jsonWeather = await fetchApiData(urlcode);


  printWeather(jsonWeather);
});

function printWeather(jsonWeather) {
  const weatherSection = document.getElementById("weather-section");
  let isRainy = new Boolean(false);
  jsonWeather.list.slice(0, 3 ).forEach((element) => {
    const id = element.weather[0].id.toString();
    console.log("loop:",id);
    if (id.startsWith("5") || id.startsWith("6")) {
      
        isRainy = true;
      } 
  });
 
  if(isRainy===true){
    weatherSection.innerHTML = 'Va a llover en las próximas 8 horas'
  }else {
    weatherSection.innerHTML = 'NO va a llover en las próximas 8 horas'

  }
}

// Búsqueda por texto delegada a searchcity.js
searchCityButton.addEventListener('click', () => {
  handleSearchCity(cityInput, leftSection, rightSection, handleError);
});
