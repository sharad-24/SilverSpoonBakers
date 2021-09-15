/*
 * HomeLoginConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const HOME_LOGIN = 'silverspoon-frontend/Home/Login/HOME_LOGIN';
export const HOME_LOGIN_SUCCESS = 'silverspoon-frontend/Home/Login/HOME_LOGIN_SUCCESS';
export const HOME_LOGIN_ERROR = 'silverspoon-frontend/Home/Login/HOME_LOGIN_ERROR';

export const HOME_FORGET = 'silverspoon-frontend/Home/ForgetPassword/HOME_FORGET';
export const HOME_FORGET_SUCCESS = 'silverspoon-frontend/Home/ForgetPassword/HOME_FORGET_SUCCESS';
export const HOME_FORGET_ERROR = 'silverspoon-frontend/Home/ForgetPassword/HOME_FORGET_ERROR';

export const ADMIN_PRODUCTS_FETCH =
  'silverspoon-frontend/Home/ADMIN_PRODUCTS_FETCH';
export const ADMIN_PRODUCTS_FETCH_SUCCESS =
  'silverspoon-frontend/Home/ADMIN_PRODUCTS_FETCH_SUCCESS';
export const ADMIN_PRODUCTS_FETCH_ERROR =
  'silverspoon-frontend/Home/ADMIN_PRODUCTS_FETCH_ERROR';

export const ADMIN_CATEGORY_FETCH =
  'silverspoon-frontend/Home/ADMIN_CATEGORY_FETCH';
export const ADMIN_CATEGORY_FETCH_SUCCESS =
  'silverspoon-frontend/Home/ADMIN_CATEGORY_FETCH_SUCCESS';
export const ADMIN_CATEGORY_FETCH_ERROR =
  'silverspoon-frontend/Home/ADMIN_CATEGORY_FETCH_ERROR';