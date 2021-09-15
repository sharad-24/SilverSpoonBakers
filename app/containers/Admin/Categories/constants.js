/*
 * AdminCategoriesConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADMIN_CATEGORY_FETCH = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_FETCH';
export const ADMIN_CATEGORY_FETCH_SUCCESS = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_FETCH_SUCCESS';
export const ADMIN_CATEGORY_FETCH_ERROR = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_FETCH_ERROR';

export const ADMIN_CATEGORY_ADD = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_ADD';
export const ADMIN_CATEGORY_ADD_SUCCESS = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_ADD_SUCCESS';
export const ADMIN_CATEGORY_ADD_ERROR = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_ADD_ERROR';

export const ADMIN_CATEGORY_EDIT = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_EDIT';
export const ADMIN_CATEGORY_EDIT_SUCCESS = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_EDIT_SUCCESS';
export const ADMIN_CATEGORY_EDIT_ERROR = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_EDIT_ERROR';

export const ADMIN_CATEGORY_DELETE = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_DELETE';
export const ADMIN_CATEGORY_DELETE_SUCCESS = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_DELETE_SUCCESS';
export const ADMIN_CATEGORY_DELETE_ERROR = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_DELETE_ERROR';

export const ADMIN_SUBCATEGORY_FETCH = 'silverspoon-frontend/Admin/SubCategories/ADMIN_SUBCATEGORY_FETCH';
export const ADMIN_SUBCATEGORY_FETCH_SUCCESS = 'silverspoon-frontend/Admin/SubCategories/ADMIN_SUBCATEGORY_FETCH_SUCCESS';
export const ADMIN_SUBCATEGORY_FETCH_ERROR = 'silverspoon-frontend/Admin/SubCategories/ADMIN_SUBCATEGORY_FETCH_ERROR';

export const ADMIN_SUBCATEGORY_ADD = 'silverspoon-frontend/Admin/SubCategories/ADMIN_SUBCATEGORY_ADD';
export const ADMIN_SUBCATEGORY_ADD_SUCCESS = 'silverspoon-frontend/Admin/SubCategories/ADMIN_SUBCATEGORY_ADD_SUCCESS';
export const ADMIN_SUBCATEGORY_ADD_ERROR = 'silverspoon-frontend/Admin/SubCategories/ADMIN_SUBCATEGORY_ADD_ERROR';

export const ADMIN_SUBCATEGORY_EDIT = 'silverspoon-frontend/Admin/Categories/ADMIN_SUBCATEGORY_EDIT';
export const ADMIN_SUBCATEGORY_EDIT_SUCCESS = 'silverspoon-frontend/Admin/Categories/ADMIN_SUBCATEGORY_EDIT_SUCCESS';
export const ADMIN_SUBCATEGORY_EDIT_ERROR = 'silverspoon-frontend/Admin/Categories/ADMIN_SUBCATEGORY_EDIT_ERROR';

export const ADMIN_SUBCATEGORY_DELETE = 'silverspoon-frontend/Admin/Categories/ADMIN_SUBCATEGORY_DELETE';
export const ADMIN_SUBCATEGORY_DELETE_SUCCESS = 'silverspoon-frontend/Admin/Categories/ADMIN_SUBCATEGORY_DELETE_SUCCESS';
export const ADMIN_SUBCATEGORY_DELETE_ERROR = 'silverspoon-frontend/Admin/Categories/ADMIN_SUBCATEGORY_DELETE_ERROR';

export const ADMIN_CATEGORY_REMOVE_ERROR = 'silverspoon-frontend/Admin/Categories/ADMIN_CATEGORY_REMOVE_ERROR';