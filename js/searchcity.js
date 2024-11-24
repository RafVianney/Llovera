'use strict'

import { fetchApiData } from './fetch.js';
import { obtenerUbicacion } from './geo.js';

export async function handleSearchCity(cityInput, midSection, upSection, handleError) {
  const city = cityInput.value.trim();
  if (!city) {
    handleError(new Error('Por favor, introduce una ciudad.'));
    return;
  }

  try {
    // Usamos obtenerUbicacion desde geo.js para encontrar las coordenadas
    const posicion = await obtenerUbicacion(2, city);
    await getWeather(posicion.latitud, posicion.longitud, city);

    // Ocultar las secciones de búsqueda y mostrar los resultados
    midSection.style.display = 'none';
    upSection.style.display = 'none';
  } catch (error) {
    handleError(error);
  }
}
