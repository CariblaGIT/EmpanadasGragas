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

   const precioPollo = 12;
   const precioTernera = 14;
   const precioVerdura = 16;
   let totalCosto = 0;

   let arrayEmpanadasPollo = new Array(empanadasPollo*2).fill(precioPollo/2);
   let arrayEmpanadasTernera = new Array(empanadasTernera*2).fill(precioTernera/2);
   let arrayEmpanadasVerduras = new Array(empanadasVerdura*2).fill(precioVerdura/2);

   let arrayVerduraTernera = arrayEmpanadasVerduras.concat(arrayEmpanadasTernera);
   let arrayEmpanadasPedidas = arrayVerduraTernera.concat(arrayEmpanadasPollo);

   if(arrayEmpanadasPollo.length == arrayEmpanadasTernera.length && arrayEmpanadasPollo.length == arrayEmpanadasVerduras.length){
      totalCosto = precioTernera * empanadasTernera;
   } else {
      for(let i = 0; i < arrayEmpanadasPedidas.length; i += 3){
         totalCosto += arrayEmpanadasPedidas[i];
      }
   }
   
   return totalCosto;
};