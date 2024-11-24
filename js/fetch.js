'use strict'

export async function fetchApiData(url, config = {}) {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
