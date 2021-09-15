/*
 * AdminORDERSConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADMIN_ORDERS_FETCH =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_FETCH';
export const ADMIN_ORDERS_FETCH_SUCCESS =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_FETCH_SUCCESS';
export const ADMIN_ORDERS_FETCH_ERROR =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_FETCH_ERROR';

export const ADMIN_ORDERS_ADD =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_ADD';
export const ADMIN_ORDERS_ADD_SUCCESS =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_ADD_SUCCESS';
export const ADMIN_ORDERS_ADD_ERROR =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_ADD_ERROR';

export const ADMIN_ORDERS_EDIT =
  'silverspoon-frontend/Admin/Order/ADMIN_ORDERS_EDIT';
export const ADMIN_ORDERS_EDIT_SUCCESS =
  'silverspoon-frontend/Admin/Order/ADMIN_ORDERS_EDIT_SUCCESS';
export const ADMIN_ORDERS_EDIT_ERROR =
  'silverspoon-frontend/Admin/Order/ADMIN_ORDERS_EDIT_ERROR';

export const ADMIN_ORDERS_DELETE =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_DELETE';
export const ADMIN_ORDERS_DELETE_SUCCESS =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_DELETE_SUCCESS';
export const ADMIN_ORDERS_DELETE_ERROR =
  'silverspoon-frontend/Admin/Orders/ADMIN_ORDERS_DELETE_ERROR';

export const ADMIN_ALL_SUBCATEGORIES_FETCH =
  'silverspoon-frontend/Admin/Orders/ADMIN_ALL_SUBCATEGORIES_FETCH';
export const ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS =
  'silverspoon-frontend/Admin/Orders/ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS';
export const ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR =
  'silverspoon-frontend/Admin/Orders/ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR';
