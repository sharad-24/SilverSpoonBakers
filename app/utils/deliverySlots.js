const HALF_KG_CAKE_PREPARATION_TIME = 5; //5hrs
import { DELIVERY_SLOTS, DELIVERY_SLOTS_ARRAY } from './constants';

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

export const DELIVERY_SLOTS_LOGIC = {
  //logic_1 is for 1/2 kg cakes
  LOGIC_1: (currentDate, deliveryDate, currentTimestamp) => {
    
    // console.log('LOGIC_1 for delivery slot is selected.');
    currentDate.setHours(0, 0, 0, 0);
    deliveryDate.setHours(0, 0, 0, 0);
    
    const hours = currentTimestamp.getUTCHours();
    let VALID_SLOT_INDEX = 0;
    
    if (currentDate.getTime() === deliveryDate.getTime()) {
      
      if (hours >= 0 && hours < 10) {
        
         VALID_SLOT_INDEX = 2;
       
      } else if (hours >= 10 && hours < 18) {
        const validTime = hours + HALF_KG_CAKE_PREPARATION_TIME;
         VALID_SLOT_INDEX = DELIVERY_SLOTS_ARRAY.findIndex(
          slot => slot.from > validTime,
        );
        
      } else {
         VALID_SLOT_INDEX = 7;
       
      }
    } else {
      //when deliveryDate and currentDate are not same.
      if (hours < 18) {
         VALID_SLOT_INDEX = 0;
       
      }

      //next day delivery.
      if (currentDate.getTime() + MILLISECONDS_IN_A_DAY === deliveryDate.getTime()) {
       
        if (hours >= 18 && hours < 22) {
           VALID_SLOT_INDEX = 1;
          
        } else if (hours >= 22 && hours <= 23) {
           VALID_SLOT_INDEX = 2;
          
        }
      } else {
         VALID_SLOT_INDEX = 0;
        
      }
    }
    //console.log({VALID_SLOT_INDEX});
    return VALID_SLOT_INDEX
  },
  //logic_2 is for 1-2 kg cakes and non cake items.
  LOGIC_2: (currentDate, deliveryDate, currentTimestamp) => {
    //console.log('LOGIC_2 for delivery slot is selected.');

    currentDate.setHours(0, 0, 0, 0);
    deliveryDate.setHours(0, 0, 0, 0);

    const currentHours = currentTimestamp.getUTCHours();
    let VALID_SLOT_INDEX = 0;

    if (currentDate.getTime() === deliveryDate.getTime()) {
      if (currentHours >= 0 && currentHours < 10) {
         VALID_SLOT_INDEX = 2;
         
      } else {
         VALID_SLOT_INDEX = 7;
      }
    } else if (currentDate.getTime() + MILLISECONDS_IN_A_DAY === deliveryDate.getTime()) {
            // console.log('next day logic');
             
             if (currentHours < 10) {
               VALID_SLOT_INDEX = 0;
              
             } else if (currentHours >= 10 && currentHours < 18) {
                VALID_SLOT_INDEX = 0;
              
             } else if (currentHours >= 18 && currentHours < 22) {
                VALID_SLOT_INDEX = 1;
              
             } else if (currentHours <= 22 && currentHours <= 23) {
               VALID_SLOT_INDEX = 2;
               
             }
           } else {
             VALID_SLOT_INDEX = 0;
           }
       // console.log({VALID_SLOT_INDEX});
        return VALID_SLOT_INDEX
  },
  //logic_3 is for cakes 2.5kg and above.
  LOGIC_3: (currentDate, deliveryDate, currentTimestamp) => {
    //console.log('LOGIC_3 for delivery slot is selected.');
    
    currentDate.setHours(0, 0, 0, 0);
    deliveryDate.setHours(0, 0, 0, 0);
   
    const VALID_NUMBER_OF_DAYS = 2;
    let VALID_SLOT_INDEX = 0;

    const hours = currentTimestamp.getUTCHours();
    if (currentDate.getTime() === deliveryDate.getTime()) {                                                  
        VALID_SLOT_INDEX = 7;
    }
    else if (currentDate.getTime() + MILLISECONDS_IN_A_DAY === deliveryDate.getTime()) {
      if (hours >= 0 && hours < 10) {
        VALID_SLOT_INDEX = 2;
      } else {
        VALID_SLOT_INDEX = 7;
      }
    } else if (
      currentDate.getTime() +
        VALID_NUMBER_OF_DAYS * MILLISECONDS_IN_A_DAY ===
      deliveryDate.getTime()
    ) {
      if (hours < 10) {
        VALID_SLOT_INDEX = 0;
      } else if (hours >= 10 && hours < 18) {
        VALID_SLOT_INDEX = 1;
      } else if (hours >= 18 && hours < 22) {
        
        VALID_SLOT_INDEX = 2;
      } else if (hours <= 22 && hours <= 23) {
       
        VALID_SLOT_INDEX = 2;
      }
    } else {
      VALID_SLOT_INDEX = 0;
    }
    //console.log({VALID_SLOT_INDEX});
           return VALID_SLOT_INDEX;
  },
};

//if any of the products ordered is a cake of 2.5 kg or above , then the logic 3 is applicable.
//if any of the products ordered is a cake of 1-2 kg, then the logic 2 is applicable.
//if any of the products ordered is a cake of 1/2 kb, then the logic 3 is applicable.

//precedence order for the logics is LOGIC_3 > LOGIC_2 > LOGIC_1
export const getDeliverySlotLogic = products => {
  try {
    if (products !== null && products !== undefined) {
      let isLOGIC_1, isLOGIC_2, isLOGIC_3;
      isLOGIC_1 = isLOGIC_2 = isLOGIC_3 = false;
      products.map(product => {
        if (product['isCake'] === null || product['isCake'] === undefined) {
          throw new Error('MISSING_INPUT');
        }
        // condition for the non cake products
        if (product['isCake'] === false) {
          isLOGIC_2 = true;
        }
        //conditions for the cake products
        else {
          const weight = product['weight'];
          if (weight === 0.5) {
            isLOGIC_1 = true;
          } else if (weight >= 1 && weight <= 2) {
            isLOGIC_2 = true;
          } else if (weight >= 2) {
            isLOGIC_3 = true;
          } else {
            throw new Error('INVALID_CAKE_WEIGHT');
          }
        }
      });
     // console.log({ isLOGIC_1, isLOGIC_2, isLOGIC_3 });
      if (isLOGIC_3) {
        return 'LOGIC_3';
      } else if (isLOGIC_2) {
        return 'LOGIC_2';
      } else if (isLOGIC_1) {
        return 'LOGIC_1';
      } else {
        return 'LOGIC_3';
      }
    } else {
      throw new Error('INVALID_PRODUCT_QUANTITY');
    }
  } catch (error) {
    throw error;
  }
};
