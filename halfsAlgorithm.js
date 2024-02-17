export const fn = (empanadasPollo, empanadasTernera, empanadasVerdura) => {
   // ========================================
   // FIRST PART - ERROR CASE ESCENARIOS
   // ========================================

   // Is checked if one of the dumplings input number is negative cause is not possible to buy negative dumplings x.x
   if(empanadasPollo < 0 || empanadasTernera < 0 || empanadasVerdura < 0){
      throw new Error("Hay alguna empanada menor a cero, y eso es imposible");
   }

   // Is checked if the total of dumplings is not a 3 multiple, in that case the remainder will be different to 0
   if((empanadasPollo + empanadasTernera + empanadasVerdura) % 3 != 0){
      throw new Error("El numero de empanadas no es multiplo de 3, por lo que no se aprovecha la oferta del 3x1");
   }

   // Is checked if the total dumplings is over 40, you passed the maximum amount per buy ;(
   if(empanadasPollo + empanadasTernera + empanadasVerdura >= 40){
      throw new Error("El numero de empanadas pedido excede el de produccion");
   }

   // Global variables for, in order: Total cost of the order and the cost of a chicken, meat and veggie dumpling respectively
   let totalCosto = 0;
   const precioPollo = 12;
   const precioTernera = 14;
   const precioVerdura = 16;

   // ========================================
   // SECOND PART - COOKING HALFS ESCENARIOS
   // ========================================  

   // To achieve this part, firstly we make arrays of double amount size with the halfs price of each type of dumpling
   let arrayEmpanadasPollo = new Array(empanadasPollo*2).fill(precioPollo/2);
   let arrayEmpanadasTernera = new Array(empanadasTernera*2).fill(precioTernera/2);
   let arrayEmpanadasVerduras = new Array(empanadasVerdura*2).fill(precioVerdura/2);

   //And after that we make a general array with the most expensive to the lowest expensive numbers (f.e => fn(1,1,1) => [8,8,7,7,6,6])
   let arrayVerduraTernera = arrayEmpanadasVerduras.concat(arrayEmpanadasTernera);
   let arrayEmpanadasPedidas = arrayVerduraTernera.concat(arrayEmpanadasPollo);

   /* And we check firstly if the case scenario is not when there are the same amount of each type, in that case the best result is 
      to make as is done on the original algorithm part 2 best case scenario: removing all dumplings 1 by 1 and adding the medium price.
      That is the same to take the amount of meat dumplings (is the same as the other types) and mulitply it to the medium cost */
   if(arrayEmpanadasPollo.length == arrayEmpanadasTernera.length && arrayEmpanadasPollo.length == arrayEmpanadasVerduras.length){
      totalCosto = precioTernera * empanadasTernera;
   } else {
      /* If is not the previous case, we loop through the array created previously jumping 3 positions on each cycle, adn adding to
         the total cost the value of that position (f.e => fn(2,0,1) => [8,8,8,8,6,6] => totalCost = 8 + 8)*/
      for(let i = 0; i < arrayEmpanadasPedidas.length; i += 3){
         totalCosto += arrayEmpanadasPedidas[i];
      }
   }

   // After checking the both scenarios, the total cost is given, knowing the minimum price to spend on that buy :D
   return totalCosto;
};