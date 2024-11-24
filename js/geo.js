'use strict'

import { fetchApiData } from './fetch.js';

export function borradorcontenedor() {
  const menuContainer = document.getElementById("choice-container");
  menuContainer.innerHTML = "";
}

function elegiropcion(botones) {
  return new Promise((resolve) => {
    const menuContainer = document.getElementById("choice-container");
    borradorcontenedor();
    botones.forEach((boton, indice) => {
      const buttonElement = document.createElement("button");
      buttonElement.textContent = boton.display_name;
      buttonElement.dataset.id = indice;

      buttonElement.addEventListener("click", (event) => {
        const botonPulsado = event.target.dataset.id;
        resolve(botonPulsado);
      });

      menuContainer.appendChild(buttonElement);
    });
  });
}

export async function obtenerUbicacion(modo = 1, ciudad = "madrid") {
  if (modo === 1) {
    return new Promise((resuelta, rechazada) => {
      if (!navigator.geolocation) {
        rechazada(new Error("La geolocalización no es compatible con este navegador."));
      } else {
        const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
        navigator.geolocation.getCurrentPosition(
          (pos) => resuelta({ latitud: pos.coords.latitude, longitud: pos.coords.longitude }),
          (err) => rechazada(new Error('Error al obtener la geolocalización: ' + err.message)),
          options
        );
      }
    });
  } else {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${ciudad}&format=json&accept-language=es`;
      const data = await fetchApiData(url);
      if (data.length === 0) throw new Error(`La ciudad indicada (${ciudad}) no existe.`);
      if (data.length === 1) return { latitud: parseFloat(data[0].lat), longitud: parseFloat(data[0].lon) };
      const opcionelegida = await elegiropcion(data);
      return { latitud: parseFloat(data[opcionelegida].lat), longitud: parseFloat(data[opcionelegida].lon) };
    } catch (err1) {
      throw new Error(err1.message);
    }
  }
}
