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

   let totalCosto = Math.ceil((empanadasPollo * precioPollo + empanadasTernera * precioTernera + empanadasVerdura * precioVerdura) / 3);
   
   return totalCosto;
};