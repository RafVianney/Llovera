"use strict"

// Función para obtener la geolocalización con manejo de errores usando try...catch
export function obtenerUbicacion() {
    try {
      let result= {latitud:0 ,longitud:0,errorcode:0,error:""};
      // Verifica si el navegador soporta la geolocalización
      if (!navigator.geolocation) {
        throw new Error("La geolocalización no es compatible con este navegador.");
      }
      // Valores iniciales para a el parametro de geolocation
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      //funcion que se ejecuta cuando geopolocalitacion es correcta
      function success(pos) {
        const crd = pos.coords;
        result.latitud=crd.latitude;
        result.longitud=crd.longitude;
      }

      //Funcion que se ejecute cuando hay un fallo valores( 1 PERMISSION_DENIED,2 POSITION_UNAVAILABLE,3 TIMEOUT) y los valores devuelto sera -99999 ya que el valor 0 si es un valor posible.

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        result.latitud=-99999;
        result.longitud=-99999;
        result.errorcode=err.code;
        result.error=err.message;
        return result;
      }
        //getCurrentPosition recibe 3 parametros 1 funcion que hacer cuando esta correcta la funcion
      navigator.geolocation.getCurrentPosition(success, error, options);
      

      

      return result;
  
    } catch (e) {
      // Manejador de errores En caso que el navegador no pueda llamar a navigator geolocation dara un error indermiado que capturamos como error 4
      
      return {latitud:-99999 ,longitud:-99999,errocode:4,error:e.message}
    }

    
  }

  