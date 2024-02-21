export const fn = (chickenDumplings, meatDumplings, veggieDumplings) => {
   // ========================================
   // FIRST PART - ERROR CASE ESCENARIOS
   // ========================================

   // Is checked if one of the dumplings input number is negative cause is not possible to buy negative dumplings x.x
   if(chickenDumplings < 0 || meatDumplings < 0 || veggieDumplings < 0){
      throw new Error("Negative dumplings, that is impossible");
   }

   // Is checked if the total of dumplings is not a 3 multiple, in that case the remainder will be different to 0
   if((chickenDumplings + meatDumplings + veggieDumplings) % 3 != 0){
      throw new Error("Number of dumplings not 3 multiple, we cannot use the 3x1 offer if that happens");
   }

   // Is checked if the total dumplings is over 40, you passed the maximum amount per buy ;(
   if(chickenDumplings + meatDumplings + veggieDumplings >= 40){
      throw new Error("Total number of dumplings os greater than the production one, not affordable");
   }

   // Global variables for, in order: Total cost of the order and the cost of a chicken, meat and veggie dumpling respectively
   let totalCost = 0;
   const chickenPrice = 12;
   const meatPrice = 14;
   const veggiePrice = 16;

   // ========================================
   // SECOND PART - COOKING HALFS ESCENARIOS
   // ========================================  

   // To achieve this part, firstly we make arrays of double amount size with the halfs price of each type of dumpling
   let arrayChickenDumplings = new Array(chickenDumplings*2).fill(chickenPrice/2);
   let arrayMeatDumplings = new Array(meatDumplings*2).fill(meatPrice/2);
   let arrayVeggieDumplings = new Array(veggieDumplings*2).fill(veggiePrice/2);

   //And after that we make a general array with the most expensive to the lowest expensive numbers (f.e => fn(1,1,1) => [8,8,7,7,6,6])
   let arrayVeggieMeat = arrayVeggieDumplings.concat(arrayMeatDumplings);
   let arrayOrderedDumplings = arrayVeggieMeat.concat(arrayChickenDumplings);

   /* And we check firstly if the case scenario is not when there are the same amount of each type, in that case the best result is 
      to make as is done on the original algorithm part 2 best case scenario: removing all dumplings 1 by 1 and adding the medium price.
      That is the same to take the amount of meat dumplings (is the same as the other types) and mulitply it to the medium cost */
   if(arrayChickenDumplings.length == arrayMeatDumplings.length && arrayChickenDumplings.length == arrayVeggieDumplings.length){
      totalCost = meatPrice * meatDumplings;
   } else {
      /* If is not the previous case, we loop through the array created previously jumping 3 positions on each cycle, adn adding to
         the total cost the value of that position (f.e => fn(2,0,1) => [8,8,8,8,6,6] => totalCost = 8 + 8)*/
      for(let i = 0; i < arrayOrderedDumplings.length; i += 3){
         totalCost += arrayOrderedDumplings[i];
      }
   }

   // After checking the both scenarios, the total cost is given, knowing the minimum price to spend on that buy :D
   return totalCost;
};