export const fn = (chickenDumplings, meatDumplings, veggieDumplings) => {
   // ========================================
   // FIRST PART - ERROR CASE ESCENARIOS
   // ========================================

   // First of all, is created an object to know which offer is selected for each case scenario
   let offersTaken = {
      "offer3x1 - 1 of each type" : 0,
      "offer3x1 - 3 chicken dumplings" : 0,
      "offer3x1 - 3 meat dumplings" : 0,
      "offer3x1 - 3 veggie dumplings" : 0,
      "offer3x1 - 2 veggies 1 meat dumplings" : 0,
      "offer3x1 - 2 veggies 1 chicken dumplings" : 0,
      "offer3x1 - 2 meat 1 veggie dumplings" : 0,
      "offer3x1 - 2 meat 1 chicken dumplings" : 0,
      "offer3x1 - 2 chicken 1 veggie dumplings" : 0,
      "offer3x1 - 2 chicken 1 meat dumplings" : 0
   }

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

   // Printing in console the values before destroying the values
   console.log("=== NUMBER OF DUMPLINGS OF EACH TYPE ====");
   console.log("Number of chicken dumplings: " + chickenDumplings);
   console.log("Number of meat dumplings: " + meatDumplings);
   console.log("Number of veggie dumplings: " + veggieDumplings);

   // Global variables for, in order: Total cost of the order and the cost of a chicken, meat and veggie dumpling respectively
   let totalCost = 0;
   const chickenPrice = 12;
   const meatPrice = 14;
   const veggiePrice = 16;

   // ========================================
   // SECOND PART - BEST CASE SCENARIO
   // ========================================

   /* The best case scenario is to take 1 of each type of dumpling, assuming the cost of all as 14€, so is done a loop
      until one of the amounts is zero, adding 14 to the totalCost and removing 1 of each type of dumpling*/
   while(chickenDumplings > 0 && meatDumplings > 0 && veggieDumplings > 0){
      offersTaken["offer3x1 - 1 of each type"] += 1;
      totalCost = totalCost + 14;
      chickenDumplings--;
      meatDumplings--;
      veggieDumplings--;
   }

   // After that, we check if there are dumplings of each type, that will be used to figure out in which case we are
   let isChicken = (chickenDumplings) ? 1 : 0;
   let isMeat = (meatDumplings) ? 1 : 0;
   let isVeggie = (veggieDumplings) ? 1 : 0;

   // ========================================
   // THIRD PART - REMAINING SCENARIOS
   // ========================================
   
   /*
      CASE 1 => No chicken or meat dumplings:
         In this case, the only thing that is done is to removing 3 by 3 the veggies dumplings and adding the price of
         one veggie dumpling to the totalCost until we spend all dumplings 
         + Is added an implementation to add what offer is selected into the offersTaken object
   */
   if(!isChicken && !isMeat){
      while(veggieDumplings > 0){
         offersTaken["offer3x1 - 3 veggie dumplings"] += 1;
         totalCost = totalCost + veggiePrice;
         veggieDumplings = veggieDumplings - 3;
      }
   }

   /*
      CASE 2 => No chicken or veggie dumplings:
         In this case, the only thing that is done is to removing 3 by 3 the meat dumplings and adding the price of
         one meat dumpling to the totalCost until we spend all dumplings
         + Is added an implementation to add what offer is selected into the offersTaken object
   */
   if(!isVeggie && !isChicken){
      while(meatDumplings > 0){
         offersTaken["offer3x1 - 3 meat dumplings"] += 1;
         totalCost = totalCost + meatPrice;
         meatDumplings = meatDumplings - 3;
      }
   }

   /*
      CASE 3 => No veggie or meat dumplings:
         In this case, the only thing that is done is to removing 3 by 3 the chicken dumplings and adding the price of
         one chicken dumpling to the totalCost until we spend all dumplings 
         + Is added an implementation to add what offer is selected into the offersTaken object
   */
   if(!isVeggie && !isMeat){
      while(chickenDumplings > 0){
         offersTaken["offer3x1 - 3 chicken dumplings"] += 1;
         totalCost = totalCost + chickenPrice;
         chickenDumplings = chickenDumplings - 3;
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
            + Is added an implementation to add what offer is selected into the offersTaken object
   */
   if(!isChicken){
      while(meatDumplings > 0 || veggieDumplings > 0){
         if(meatDumplings < veggieDumplings && meatDumplings % 3 != 0 && veggieDumplings % 3){
            offersTaken["offer3x1 - 2 veggies 1 meat dumplings"] += 1;
            totalCost = totalCost + veggiePrice;
            meatDumplings = meatDumplings - 1;
            veggieDumplings = veggieDumplings - 2;
         } else if (meatDumplings > veggieDumplings && meatDumplings % 3 != 0 && veggieDumplings % 3){
            offersTaken["offer3x1 - 2 meat 1 veggie dumplings"] += 1;
            totalCost = totalCost + (veggiePrice + meatPrice)/2;
            meatDumplings = meatDumplings - 2;
            veggieDumplings = veggieDumplings - 1;
         } else if(meatDumplings == 0){
            offersTaken["offer3x1 - 3 veggie dumplings"] += 1;
            totalCost = totalCost + veggiePrice;
            veggieDumplings = veggieDumplings - 3;
         } else if(veggieDumplings == 0){
            offersTaken["offer3x1 - 3 meat dumplings"] += 1;
            totalCost = totalCost + meatPrice;
            meatDumplings = meatDumplings - 3;
         } else {
            offersTaken["offer3x1 - 3 veggie dumplings"] += 1;
            offersTaken["offer3x1 - 3 meat dumplings"] += 1;
            totalCost = totalCost + veggiePrice + meatPrice;
            veggieDumplings = veggieDumplings - 3;
            meatDumplings = meatDumplings - 3;
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
            + Is added an implementation to add what offer is selected into the offersTaken object
   */
   if(!isMeat){
      while(chickenDumplings > 0 || veggieDumplings > 0){
         if(chickenDumplings < veggieDumplings && chickenDumplings % 3 != 0 && veggieDumplings % 3){
            offersTaken["offer3x1 - 2 veggies 1 chicken dumplings"] += 1;
            totalCost = totalCost + veggiePrice;
            chickenDumplings = chickenDumplings - 1;
            veggieDumplings = veggieDumplings - 2;
         } else if (chickenDumplings > veggieDumplings && chickenDumplings % 3 != 0 && veggieDumplings % 3){
            offersTaken["offer3x1 - 2 chicken 1 veggie dumplings"] += 1;
            totalCost = totalCost + (chickenPrice + veggiePrice)/2;
            chickenDumplings = chickenDumplings - 2;
            veggieDumplings = veggieDumplings - 1;
         } else if(chickenDumplings == 0){
            offersTaken["offer3x1 - 3 veggie dumplings"] += 1;
            totalCost = totalCost + veggiePrice;
            veggieDumplings = veggieDumplings - 3;
         } else if(veggieDumplings == 0){
            offersTaken["offer3x1 - 3 chicken dumplings"] += 1;
            totalCost = totalCost + chickenPrice;
            chickenDumplings = chickenDumplings - 3;
         } else {
            offersTaken["offer3x1 - 3 veggie dumplings"] += 1;
            offersTaken["offer3x1 - 3 chicken dumplings"] += 1;
            totalCost = totalCost + veggiePrice + chickenPrice;
            veggieDumplings = veggieDumplings - 3;
            chickenDumplings = chickenDumplings - 3;
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
            + Is added an implementation to add what offer is selected into the offersTaken object
   */
   if(!isVeggie){
      while(chickenDumplings > 0 || meatDumplings > 0){
         if(chickenDumplings < meatDumplings && meatDumplings % 3 != 0 && chickenDumplings % 3){
            offersTaken["offer3x1 - 2 meat 1 chicken dumplings"] += 1;
            totalCost = totalCost + meatPrice;
            chickenDumplings = chickenDumplings - 1;
            meatDumplings = meatDumplings - 2;
         } else if (chickenDumplings > meatDumplings && meatDumplings % 3 != 0 && chickenDumplings % 3){
            offersTaken["offer3x1 - 2 chicken 1 meat dumplings"] += 1;
            totalCost = totalCost + (chickenPrice + meatPrice)/2;
            chickenDumplings = chickenDumplings - 2;
            meatDumplings = meatDumplings - 1;
         } else if(meatDumplings == 0){
            offersTaken["offer3x1 - 3 chicken dumplings"] += 1;
            totalCost = totalCost + chickenPrice;
            chickenDumplings = chickenDumplings - 3;
         } else if(chickenDumplings == 0){
            offersTaken["offer3x1 - 3 meat dumplings"] += 1;
            totalCost = totalCost + meatPrice;
            meatDumplings = meatDumplings - 3;
         } else {
            offersTaken["offer3x1 - 3 meat dumplings"] += 1;
            offersTaken["offer3x1 - 3 chicken dumplings"] += 1;
            totalCost = totalCost + meatPrice + chickenPrice;
            meatDumplings = meatDumplings - 3;
            chickenDumplings = chickenDumplings - 3;
         }
      }
   }

   //Printing in console the result of the minimum cost
   console.log("=== MINIMUM COST FOR THAT DUMPLINGS ===");
   console.log(totalCost);

   // Loop to remove offers not used
   for (const [key, value] of Object.entries(offersTaken)) {
      if(value == 0){
         delete offersTaken[key]
      }
   }

   //Printing in console the selected offers
   console.log("=== ALL THE OFFERS SELECTED FOR THAT CASE ===");
   console.log(offersTaken);

   // After checking all scenarios, the total cost is given, knowing the minimum price to spend on that buy :D
   return totalCost;
 };