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
   // SECOND PART - BEST CASE SCENARIO
   // ========================================

   /* The best case scenario is to take 1 of each type of dumpling, assuming the cost of all as 14€, so is done a loop
      until one of the amounts is zero, adding 14 to the totalCost and removing 1 of each type of dumpling*/
   while(empanadasPollo > 0 && empanadasTernera > 0 && empanadasVerdura > 0){
      totalCosto = totalCosto + 14;
      empanadasPollo--;
      empanadasTernera--;
      empanadasVerdura--;
   }

   // After that, we check if there are dumplings of each type, that will be used to figure out in which case we are
   let hayPollo = (empanadasPollo) ? 1 : 0;
   let hayTernera = (empanadasTernera) ? 1 : 0;
   let hayVerdura = (empanadasVerdura) ? 1 : 0;

   // ========================================
   // THIRD PART - REMAINING SCENARIOS
   // ========================================
   
   /*
      CASE 1 => No chicken or meat dumplings:
         In this case, the only thing that is done is to removing 3 by 3 the veggies dumplings and adding the price of
         one veggie dumpling to the totalCost until we spend all dumplings 
   */
   if(!hayPollo && !hayTernera){
      while(empanadasVerdura > 0){
         totalCosto = totalCosto + precioVerdura;
         empanadasVerdura = empanadasVerdura - 3;
      }
   }

   /*
      CASE 2 => No chicken or veggie dumplings:
         In this case, the only thing that is done is to removing 3 by 3 the meat dumplings and adding the price of
         one meat dumpling to the totalCost until we spend all dumplings 
   */
   if(!hayVerdura && !hayPollo){
      while(empanadasTernera > 0){
         totalCosto = totalCosto + precioTernera;
         empanadasTernera = empanadasTernera - 3;
      }
   }

   /*
      CASE 3 => No veggie or meat dumplings:
         In this case, the only thing that is done is to removing 3 by 3 the chicken dumplings and adding the price of
         one chicken dumpling to the totalCost until we spend all dumplings 
   */
   if(!hayVerdura && !hayTernera){
      while(empanadasPollo > 0){
         totalCosto = totalCosto + precioPollo;
         empanadasPollo = empanadasPollo - 3;
      }
   }

   /*
      CASE 4 => No chicken dumplings:
         In this case, we loop until we make all possible groups of 3 using meat and veggie dumplings following this rules:
            ●  If there are more veggies than meat, the best cost scenario is to make 2 half veggie and meat and another veggie
               dumpling, adding to the total amount the cost of the expensive dumpling (veggie one) and removing dumplings used
            ●  If there are more meat than veggies, the best cost scenario is to make 2 half veggie and meat and another meat
               dumpling, adding to the total amount the cost of the mixed dumpling((veggie + meat)/2) and removing dumplings used
            ●  If there are the same amount of each one, the best cost scenario is to not mix them, making groups of 3 of each type
               of dumpling and adding the cost of each one (that happens because if we use the previous scenarios, we spend 1 more euro)
   */
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

   /*
      CASE 5 => No meat dumplings:
         In this case, we loop until we make all possible groups of 3 using chicken and veggie dumplings following this rules:
            ●  If there are more veggies than chicken, the best cost scenario is to make 2 half veggie and chicken and another veggie
               dumpling, adding to the total amount the cost of the expensive dumpling (veggie one) and removing dumplings used
            ●  If there are more chicken than veggies, the best cost scenario is to make 2 half veggie and chicken and another chicken
               dumpling, adding to the total amount the cost of the mixed dumpling((veggie + chicken)/2) and removing dumplings used
            ●  If there are the same amount of each one, the best cost scenario is to not mix them, making groups of 3 of each type
               of dumpling and adding the cost of each one (that happens because if we use the previous scenarios, we spend 2 more euros)
   */
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

   /*
      CASE 6 => No veggie dumplings:
         In this case, we loop until we make all possible groups of 3 using meat and chicken dumplings following this rules:
            ●  If there are more meat than chicken, the best cost scenario is to make 2 half chicken and meat and another meat
               dumpling, adding to the total amount the cost of the expensive dumpling (meat one) and removing dumplings used
            ●  If there are more chicken than meat, the best cost scenario is to make 2 half chicken and meat and another chicken
               dumpling, adding to the total amount the cost of the mixed dumpling((chicken + meat)/2) and removing dumplings used
            ●  If there are the same amount of each one, the best cost scenario is to not mix them, making groups of 3 of each type
               of dumpling and adding the cost of each one (that happens because if we use the previous scenarios, we spend 1 more euro)
   */
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

   // After checking all scenarios, the total cost is given, knowing the minimum price to spend on that buy :D
   return totalCosto;
 };