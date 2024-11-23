"use strict"
//objeto = {latitud,longitud,fecha,data}



export function salvardatos(datos)

{


    const tiempo = JSON.parse(localStorage.getItem('tiempo'));


    if (tiempo===null)
    { 
      const salvar=[];
      salvar.push(datos[0]);

        localStorage.setItem('tiempo', JSON.stringify(salvar));   
      
    }
    else
  {  
   
    tiempo.push(datos[0]);
  
    localStorage.setItem('tiempo', JSON.stringify(tiempo));   
 
  }
}

export  function recuperardatos(lat,log)
{

    const tiempo = JSON.parse(localStorage.getItem('tiempo'));
   
    if (tiempo===null)
        {
       
           return -1;
        }
        else
        {
         
            const d = new Date();
            let time = d.getTime();
            time=Math.floor(time/1000);
            tiempo.sort((a,b) => b.fecha-a.fecha);

            let muestra = tiempo.filter((elemento)=>elemento.fecha<time+3600);
         
            let finalvalue=muestra.filter((elemento)=>elemento.latitud===lat&&elemento.longitud===log);

            if (finalvalue.length>0)
            {          return finalvalue[0].data}
            else
            {
              
              return -1}



        }
    
    

}