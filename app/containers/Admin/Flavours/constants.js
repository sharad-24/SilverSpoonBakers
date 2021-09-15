/*
 * AdminStaffConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// export const ADMIN_STAFF_FETCH = 'silverspoon-frontend/Admin/Staff/ADMIN_STAFF_FETCH';
// export const ADMIN_STAFF_FETCH_SUCCESS = 'silverspoon-frontend/Admin/Staff/ADMIN_STAFF_FETCH_SUCCESS';
// export const ADMIN_STAFF_FETCH_ERROR = 'silverspoon-frontend/Admin/Staff/ADMIN_STAFF_FETCH_ERROR';

export const ADMIN_FLAVOURS_ADD = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_ADD';
export const ADMIN_FLAVOURS_ADD_SUCCESS = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_ADD_SUCCESS';
export const ADMIN_FLAVOURS_ADD_ERROR = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_ADD_ERROR';

export const ADMIN_FLAVOURS_EDIT = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_EDIT';
export const ADMIN_FLAVOURS_EDIT_SUCCESS = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_EDIT_SUCCESS';
export const ADMIN_FLAVOURS_EDIT_ERROR = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_EDIT_ERROR';

export const ADMIN_FLAVOURS_DELETE = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_DELETE';
export const ADMIN_FLAVOURS_DELETE_SUCCESS = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_DELETE_SUCCESS';
export const ADMIN_FLAVOURS_DELETE_ERROR = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_DELETE_ERROR';

export const ADMIN_FLAVOURS_REMOVE_ERROR = 'silverspoon-frontend/Admin/Flavours/ADMIN_FLAVOURS_REMOVE_ERROR';