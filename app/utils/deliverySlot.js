const HALF_KG_CAKE_PREPARATION_TIME = 5; //5hrs
const { DELIVERY_SLOTS } = require('../constants');

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
const compareSlots = (VALID_SLOT_NAME, deliverySlotObject) => {
  const VALID_SLOT = DELIVERY_SLOTS[VALID_SLOT_NAME];
  if (
    deliverySlotObject['from'] >= VALID_SLOT['from'] &&
    deliverySlotObject['to'] >= VALID_SLOT['to']
  ) {
    return deliverySlotObject;
  } else {
    throw new Error('INVALID_DELIVERY_SLOT');
  }
};
const DELIVERY_SLOTS_LOGIC = {
  //logic_1 is for 1/2 kg cakes
  LOGIC_1: (
    deliverySlotObject,
    currentDate,
    deliveryDate,
    currentTimestamp,
  ) => {
    console.log('LOGIC_1 for delivery slot is selected.');
    const hours = currentTimestamp.getUTCHours();
    if (currentDate.getTime() === deliveryDate.getTime()) {
      console.log('Same day delivery');
      if (hours >= 0 && hours < 10) {
        const VALID_SLOT_NAME = 'SLOT_3';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      } else if (hours >= 10 && hours < 18) {
        const validTime = hours + HALF_KG_CAKE_PREPARATION_TIME;
        if (
          (deliverySlotObject['from'] >= validTime &&
            deliverySlotObject['to'] <= validTime) ||
          (deliverySlotObject['from'] >= validTime &&
            deliverySlotObject['to'] >= validTime)
        ) {
          return deliverySlotObject;
        } else {
          throw new Error('INVALID_DELIVERY_SLOT');
        }
      } else {
        throw new Error('INVALID_DELIVERY_SLOT');
      }
    } else {
      //when deliveryDate and currentDate are not same.
      if (hours < 18) {
        return deliverySlotObject;
      }

      //next day delivery.
      if (
        currentDate.getTime() + MILLISECONDS_IN_A_DAY ===
        deliveryDate.getTime()
      ) {
        console.log('Next day delivery');
        if (hours >= 18 && hours < 22) {
          const VALID_SLOT_NAME = 'SLOT_2';
          return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
        } else if (hours >= 22 && hours <= 23) {
          const VALID_SLOT_NAME = 'SLOT_3';
          return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
        }
      } else {
        return deliverySlotObject;
      }
    }
  },
  //logic_2 is for 1-2 kg cakes and non cake items.
  LOGIC_2: (
    deliverySlotObject,
    currentDate,
    deliveryDate,
    currentTimestamp,
  ) => {
    console.log('LOGIC_2 for delivery slot is selected.');
    const VALID_NUMBER_OF_DAYS = 1;
    const hours = currentTimestamp.getUTCHours();
    if (currentDate.getTime() === deliveryDate.getTime()) {
      if (hours >= 0 && hours < 10) {
        const VALID_SLOT_NAME = 'SLOT_3';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      } else {
        throw new Error('INVALID_DELIVERY_SLOT');
      }
    } else if (
      currentDate.getTime() + MILLISECONDS_IN_A_DAY ===
      deliveryDate.getTime()
    ) {
      if (hours < 10) {
        return deliverySlotObject;
      } else if (hours >= 10 && hours < 18) {
        const VALID_SLOT_NAME = 'SLOT_1';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      } else if (hours >= 18 && hours < 22) {
        const VALID_SLOT_NAME = 'SLOT_2';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      } else if (hours <= 22 && hours <= 23) {
        const VALID_SLOT_NAME = 'SLOT_3';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      }
    } else {
      return deliverySlotObject;
    }
  },
  //logic_3 is for cakes 2.5kg and above.
  LOGIC_3: (
    deliverySlotObject,
    currentDate,
    deliveryDate,
    currentTimestamp,
  ) => {
    console.log('LOGIC_3 for delivery slot is selected.');
    const VALID_NUMBER_OF_DAYS = 2;
    const hours = currentTimestamp.getUTCHours();
    if (currentDate.getTime() === deliveryDate.getTime()) {
      throw new Error('INVALID_DELIVERY_SLOT');
    }
    if (
      currentDate.getTime() + MILLISECONDS_IN_A_DAY ===
      deliveryDate.getTime()
    ) {
      if (hours >= 0 && hours < 10) {
        const VALID_SLOT_NAME = 'SLOT_3';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      } else {
        throw new Error('INVALID_DELIVERY_SLOT');
      }
    } else if (
      currentDate.getTime() + VALID_NUMBER_OF_DAYS * MILLISECONDS_IN_A_DAY ===
      deliveryDate.getTime()
    ) {
      if (hours < 10) {
        return deliverySlotObject;
      } else if (hours >= 10 && hours < 18) {
        const VALID_SLOT_NAME = 'SLOT_2';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      } else if (hours >= 18 && hours < 22) {
        const VALID_SLOT_NAME = 'SLOT_3';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      } else if (hours <= 22 && hours <= 23) {
        const VALID_SLOT_NAME = 'SLOT_3';
        return compareSlots(VALID_SLOT_NAME, deliverySlotObject);
      }
    } else {
      return deliverySlotObject;
    }
  },
};

//if any of the products ordered is a cake of 2.5 kg or above , then the logic 3 is applicable.
//if any of the products ordered is a cake of 1-2 kg, then the logic 2 is applicable.
//if any of the products ordered is a cake of 1/2 kb, then the logic 3 is applicable.

//precedence order for the logics is LOGIC_3 > LOGIC_2 > LOGIC_1
const getDeliverySlotLogic = products => {
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
      console.log({ isLOGIC_1, isLOGIC_2, isLOGIC_3 });
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

module.exports = {
  DELIVERY_SLOTS_LOGIC,
  getDeliverySlotLogic,
};
