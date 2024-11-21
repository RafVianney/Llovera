"use strict";

import { fetchApiData } from "./fetch.js";

//Nueva funcion interna para mostrar botones si cuando se hace una peticion la localizaciones

function elegiropcion(botones) {
  return new Promise((resolve) => {
    const menuContainer = document.getElementById("choice-container");
    menuContainer.innerHTML = ""; // Limpiamos el contenedor

    botones.forEach((boton, indice) => {
      const buttonElement = document.createElement("button");
      buttonElement.textContent = boton.display_name;
      buttonElement.dataset.id = indice;

      // Evento para manejar el clic
      buttonElement.addEventListener("click", (event) => {
        const botonPulsado = event.target.dataset.id; // Recuperar el ID del botón pulsado
        resolve(botonPulsado); // Resuelve la promesa con el ID del botón pulsado
      });

      menuContainer.appendChild(buttonElement);
    });
  });
}

// Función para obtener la geolocalización con manejo de errores usando try...catch
// Se cambia la funcion ya que no es opctima y da fallos de carga.
// añadimos mas opciones

export async function obtenerUbicacion(modo = 1, ciudad = "madrid") {
  if (modo === 1) {
    return new Promise((resuelta, rechazada) => {
      if (!navigator.geolocation) {
        rechazada(
          new Error("La geolocalización no es compatible con este navegador.")
        );
      } else {
        // Valores iniciales para a el parametro de geolocation
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        //funcion que se ejecuta cuando geopolocalitacion es correcta
        function success(pos) {
          const crd = {
            latitud: pos.coords.latitude,
            longitud: pos.coords.longitude,
          };
          resuelta(crd);
        }

        //Funcion que se ejecute cuando hay un fallo valores( 1 PERMISSION_DENIED,2 POSITION_UNAVAILABLE,3 TIMEOUT) y los valores devuelto sera -99999 ya que el valor 0 si es un valor posible.

        function error(err) {
          rechazada(
            new Error("Error al obtener la geolocalización: " + err.message)
          );
        }
        //getCurrentPosition recibe 3 parametros 1 funcion que hacer cuando esta correcta la funcion
        navigator.geolocation.getCurrentPosition(success, error, options);
      }
    });
  } else {
    try {
      let urlcode =
        "https://nominatim.openstreetmap.org/search?q={" +
        ciudad +
        "}&format=json&accept-language=es";
      let data = await fetchApiData(urlcode);
      let posicion = {};

      if (data.length === 0) {
        throw new Error(
          `La ciudad indicada como ${ciudad} no existe, ¿Estaba bien escrita?`
        );
      } else if (data.length === 1) {
        posicion = {
          latitud: parseFloat(data[0].lat),
          longitud: parseFloat(data[0].lon),
        };
      } else {
        const opcionelegida = await elegiropcion(data);
        posicion = {
          latitud: parseFloat(data[opcionelegida].lat),
          longitud: parseFloat(data[opcionelegida].lon),
        };
      }

      return posicion;
    } catch (err1) {
      throw new Error(err1.message);
    }
  }
}
