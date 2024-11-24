'use strict'

import { fetchApiData } from './fetch.js';
import { obtenerUbicacion } from './geo.js';

export async function handleSearchCity(cityInput, leftSection, rightSection, handleError) {
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
    leftSection.style.display = 'none';
    rightSection.style.display = 'none';
  } catch (error) {
    handleError(error);
  }
}
