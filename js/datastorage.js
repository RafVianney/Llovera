"use strict"
//objeto = {latitud,longitud,fecha,data}



export function salvardatos(datos)

{


    const tiempo = JSON.parse(localStorage.getItem('tiempo'));

    console.log("datos aniguos",tiempo)
    console.log("datos que viene",datos);
    if (tiempo===null)
    { 
      const salvar=[];
      salvar.push(datos[0]);

        localStorage.setItem('tiempo', JSON.stringify(salvar));   
        console.log("Salto is null");
    }
    else
  {  
   
    tiempo.push(datos[0]);
    console.log("nuevo array data",tiempo);
    localStorage.setItem('tiempo', JSON.stringify(tiempo));   
    console.log("se amplio el data")
  }
}

export  function recuperardatos(lat,log)
{

    const tiempo = JSON.parse(localStorage.getItem('tiempo'));
    console.log("valor de tiempo",tiempo);
    if (tiempo===null)
        {
          console.log("is null");
           return -1;
        }
        else
        {
          console.log("not null");
            const d = new Date();
            let time = d.getTime();
            time=Math.floor(time/1000);
            tiempo.sort((a,b) => b.fecha-a.fecha);
            console.log("valor tiempo",tiempo);
            console.log("valor lat",lat);
            console.log("valor log",log);
            let muestra = tiempo.filter((elemento)=>elemento.fecha<time+3600);
            console.log("valor muestra",muestra);
            let finalvalue=muestra.filter((elemento)=>elemento.latitud===lat&&elemento.longitud===log);
            console.log("valor final",finalvalue);
            console.log(finalvalue.length>0);
            if (finalvalue.length>0)
            {          return finalvalue[0].data}
            else
            {
              
              return -1}



        }
    
    

}