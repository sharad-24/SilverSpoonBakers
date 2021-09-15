/*
 * AdminPRODUCTSConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */



export const ADMIN_CUSTOM_ORDER_EDIT =
  'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_EDIT';
export const ADMIN_CUSTOM_ORDER_EDIT_SUCCESS =
  'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_EDIT_SUCCESS';
export const ADMIN_CUSTOM_ORDER_EDIT_ERROR =
  'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_EDIT_ERROR';

export const ADMIN_CUSTOM_ORDER_DELETE =
  'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_DELETE';
export const ADMIN_CUSTOM_ORDER_DELETE_SUCCESS =
  'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_DELETE_SUCCESS';
export const ADMIN_CUSTOM_ORDER_DELETE_ERROR =
  'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_DELETE_ERROR';

  export const ADMIN_CUSTOM_ORDER_FETCH =
    'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_FETCH';
  export const ADMIN_CUSTOM_ORDER_FETCH_SUCCESS =
    'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_FETCH_SUCCESS';
  export const ADMIN_CUSTOM_ORDER_FETCH_ERROR =
    'silverspoon-frontend/Admin/CustomOrder/ADMIN_CUSTOM_ORDER_FETCH_ERROR';