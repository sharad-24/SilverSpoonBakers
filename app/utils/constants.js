export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const BUTTON_THEME_COLOR = '#ffbc2a';

export const DELIVERY_SLOTS = {
  SLOT_1: {
    name: 'SLOT_1',
    from: 12,
    to: 13,
    label: '12:00-14:00',
  },
  SLOT_2: {
    name: 'SLOT_2',
    from: 14,
    to: 15,
    label: '14:00-16:00',
  },
  SLOT_3: {
    name: 'SLOT_3',
    from: 16,
    to: 17,
    label: '16:00-18:00',
  },
  SLOT_4: {
    name: 'SLOT_4',
    from: 18,
    to: 19,
    label: '18:00-20:00',
  },
  SLOT_5: {
    name: 'SLOT_5',
    from: 20,
    to: 21,
    label: '20:00-22:00',
  },
  SLOT_6: {
    name: 'SLOT_6',
    from: 22,
    to: 23,
    label: '22:00-00:00',
  },
};

export const DELIVERY_SLOTS_ARRAY = [
  {
    name: 'SLOT_1',
    from: 12,
    to: 13,
    label: '12:00-14:00',
  },
  {
    name: 'SLOT_2',
    from: 14,
    to: 15,
    label: '14:00-16:00',
  },
  {
    name: 'SLOT_3',
    from: 16,
    to: 17,
    label: '16:00-18:00',
  },
  {
    name: 'SLOT_4',
    from: 18,
    to: 19,
    label: '18:00-20:00',
  },
  {
    name: 'SLOT_5',
    from: 20,
    to: 21,
    label: '20:00-22:00',
  },
  {
    name: 'SLOT_6',
    from: 22,
    to: 23,
    label: '22:00-00:00',
  },
];

export const CUSTOM_ORDER_STATUS_LIST = [
  'received',
  // "accepted",
  'payment_pending',
  'placed',
  'prepared',
  'delivered',
  'failed',
  'rejected',
  'cancelled',
];


