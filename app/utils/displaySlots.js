import React from 'react';

export const displayTimeFromSlot = slot => {
  switch (slot) {
    case 'SLOT_1':
      return '12:00-13:00';
    case 'SLOT_2':
      return '14:00-15:00';
    case 'SLOT_3':
      return '16:00-17:00';
    case 'SLOT_4':
      return '18:00-19:00';
    case 'SLOT_5':
      return '20:00-21:00';
    case 'SLOT_6':
      return '22:00-23:00';
    default:
      return 'INVALID_SLOT';
  }
};
