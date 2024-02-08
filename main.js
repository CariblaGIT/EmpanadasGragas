export const fn = (empanadasPollo, empanadasTernera, empanadasVerdura) => {
   if(empanadasPollo < 0 || empanadasTernera < 0 || empanadasVerdura < 0){
      throw new Error("Hay alguna empanada menor a cero, y eso es imposible");
   }

   if((empanadasPollo + empanadasTernera + empanadasVerdura) % 3 != 0){
      throw new Error("El numero de empanadas no es multiplo de 3, por lo que no se aprovecha la oferta del 3x1");
   }

   if(empanadasPollo + empanadasTernera + empanadasVerdura >= 40){
      throw new Error("El numero de empanadas pedido excede el de produccion");
   }

   let totalCosto = 0;
   const precioPollo = 12;
   const precioTernera = 14;
   const precioVerdura = 16;

   while(empanadasPollo > 0 && empanadasTernera > 0 && empanadasVerdura > 0){
      totalCosto = totalCosto + 14;
      empanadasPollo--;
      empanadasTernera--;
      empanadasVerdura--;
   }

   let hayPollo = (empanadasPollo) ? 1 : 0;
   let hayTernera = (empanadasTernera) ? 1 : 0;
   let hayVerdura = (empanadasVerdura) ? 1 : 0;

   if(!hayPollo && !hayTernera){
      while(empanadasVerdura > 0){
         totalCosto = totalCosto + precioVerdura;
         empanadasVerdura = empanadasVerdura - 3;
      }
   }

   if(!hayVerdura && !hayPollo){
      while(empanadasTernera > 0){
         totalCosto = totalCosto + precioTernera;
         empanadasTernera = empanadasTernera - 3;
      }
   }

   if(!hayVerdura && !hayTernera){
      while(empanadasPollo > 0){
         totalCosto = totalCosto + precioPollo;
         empanadasPollo = empanadasPollo - 3;
      }
   }

   if(!hayPollo){
      while(empanadasTernera > 0 && empanadasVerdura > 0){
         if(empanadasTernera < empanadasVerdura){
            totalCosto = totalCosto + precioVerdura;
            empanadasTernera = empanadasTernera - 1;
            empanadasVerdura = empanadasVerdura - 2;
         } else if (empanadasTernera > empanadasVerdura){
            totalCosto = totalCosto + (precioVerdura + precioTernera)/2;
            empanadasTernera = empanadasTernera - 2;
            empanadasVerdura = empanadasVerdura - 1;
         } else {
            totalCosto = totalCosto + precioVerdura + precioTernera;
            empanadasVerdura = empanadasVerdura - 3;
            empanadasTernera = empanadasTernera - 3;
         }
      }
   }

   if(!hayTernera){
      while(empanadasPollo > 0 && empanadasVerdura > 0){
         if(empanadasPollo < empanadasVerdura){
            totalCosto = totalCosto + precioVerdura;
            empanadasPollo = empanadasPollo - 1;
            empanadasVerdura = empanadasVerdura - 2;
         } else if (empanadasPollo > empanadasVerdura){
            totalCosto = totalCosto + (precioPollo + precioVerdura)/2;
            empanadasPollo = empanadasPollo - 2;
            empanadasVerdura = empanadasVerdura - 1;
         } else {
            totalCosto = totalCosto + precioVerdura + precioPollo;
            empanadasVerdura = empanadasVerdura - 3;
            empanadasPollo = empanadasPollo - 3;
         }
      }
   }

   if(!hayVerdura){
      while(empanadasPollo > 0 && empanadasTernera > 0){
         if(empanadasPollo < empanadasTernera){
            totalCosto = totalCosto + precioTernera;
            empanadasPollo = empanadasPollo - 1;
            empanadasTernera = empanadasTernera - 2;
         } else if (empanadasPollo > empanadasTernera){
            totalCosto = totalCosto + (precioPollo + precioTernera)/2;
            empanadasPollo = empanadasPollo - 2;
            empanadasTernera = empanadasTernera - 1;
         } else {
            totalCosto = totalCosto + precioPollo + precioTernera;
            empanadasTernera = empanadasTernera - 3;
            empanadasPollo = empanadasPollo - 3;
         }
      }
   }

   return totalCosto;
};