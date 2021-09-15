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

export const ADMIN_PRODUCTS_FETCH = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_FETCH';
export const ADMIN_PRODUCTS_FETCH_SUCCESS = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_FETCH_SUCCESS';
export const ADMIN_PRODUCTS_FETCH_ERROR = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_FETCH_ERROR';

export const ADMIN_PRODUCTS_ADD = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_ADD';
export const ADMIN_PRODUCTS_ADD_SUCCESS = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_ADD_SUCCESS';
export const ADMIN_PRODUCTS_ADD_ERROR = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_ADD_ERROR';

export const ADMIN_PRODUCTS_EDIT =
  'silverspoon-frontend/Admin/Product/ADMIN_PRODUCTS_EDIT';
export const ADMIN_PRODUCTS_EDIT_SUCCESS =
  'silverspoon-frontend/Admin/Product/ADMIN_PRODUCTS_EDIT_SUCCESS';
export const ADMIN_PRODUCTS_EDIT_ERROR =
  'silverspoon-frontend/Admin/Product/ADMIN_PRODUCTS_EDIT_ERROR';

export const ADMIN_PRODUCTS_IMAGE_EDIT =
  'silverspoon-frontend/Admin/Product/ADMIN_PRODUCTS_IMAGE_EDIT';
export const ADMIN_PRODUCTS_IMAGE_EDIT_SUCCESS =
  'silverspoon-frontend/Admin/Product/ADMIN_PRODUCTS_IMAGE_EDIT_SUCCESS';
export const ADMIN_PRODUCTS_IMAGE_EDIT_ERROR =
  'silverspoon-frontend/Admin/Product/ADMIN_PRODUCTS_IMAGE_EDIT_ERROR';

export const ADMIN_PRODUCTS_DELETE = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_DELETE';
export const ADMIN_PRODUCTS_DELETE_SUCCESS = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_DELETE_SUCCESS';
export const ADMIN_PRODUCTS_DELETE_ERROR = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_DELETE_ERROR';



export const ADMIN_ALL_SUBCATEGORIES_FETCH =
  'silverspoon-frontend/Admin/Products/ADMIN_ALL_SUBCATEGORIES_FETCH';
export const ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS =
  'silverspoon-frontend/Admin/Products/ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS';
export const ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR =
  'silverspoon-frontend/Admin/Products/ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR';

  export const ADMIN_FLAVOURS_FETCH =
    'silverspoon-frontend/Admin/Products/ADMIN_FLAVOURS_FETCH';
  export const ADMIN_FLAVOURS_FETCH_SUCCESS =
    'silverspoon-frontend/Admin/Products/ADMIN_FLAVOURS_FETCH_SUCCESS';
  export const ADMIN_FLAVOURS_FETCH_ERROR =
    'silverspoon-frontend/Admin/Products/ADMIN_FLAVOURS_FETCH_ERROR';

export const ADMIN_PRODUCTS_REMOVE_ERROR = 'silverspoon-frontend/Admin/Products/ADMIN_PRODUCTS_REMOVE_ERROR';