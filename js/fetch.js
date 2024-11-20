'use strict'

export async function fetchApiData(url, config = {}) {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al realizar la solicitud a la API:', error);
    throw error;
  }
}
