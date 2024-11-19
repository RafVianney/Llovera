"use strict"

// Función para obtener la geolocalización con manejo de errores usando try...catch
// Se cambia la funcion ya que no es opctima y da fallos de carga.
export  function obtenerUbicacion() {
  return new Promise((resuelta,rechazada)=>{
    if (!navigator.geolocation) {
      rechazada(new Error("La geolocalización no es compatible con este navegador."));
    }
    else
    {
    // Valores iniciales para a el parametro de geolocation
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    
    //funcion que se ejecuta cuando geopolocalitacion es correcta
     function success(pos) {
    
      const crd =  {latitud:pos.coords.latitude ,longitud:pos.coords.longitude};
   
      resuelta(crd);
    }

    //Funcion que se ejecute cuando hay un fallo valores( 1 PERMISSION_DENIED,2 POSITION_UNAVAILABLE,3 TIMEOUT) y los valores devuelto sera -99999 ya que el valor 0 si es un valor posible.

    function error(err) {
      rechazada(new Error('Error al obtener la geolocalización: ' + err.message));
  
    }
      //getCurrentPosition recibe 3 parametros 1 funcion que hacer cuando esta correcta la funcion
    navigator.geolocation.getCurrentPosition(success,error,options);
  }

}
);
}