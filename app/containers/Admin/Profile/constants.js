/*
 * AdminProfileConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADMIN_PROFILE_FETCH = 'silverspoon-frontend/Admin/Profile/ADMIN_PROFILE_FETCH';
export const ADMIN_PROFILE_FETCH_SUCCESS = 'silverspoon-frontend/Admin/Profile/ADMIN_PROFILE_FETCH_SUCCESS';
export const ADMIN_PROFILE_FETCH_ERROR = 'silverspoon-frontend/Admin/Profile/ADMIN_PROFILE_FETCH_ERROR';

export const ADMIN_CHANGE_PASSWORD = 'silverspoon-frontend/Admin/Profile/ADMIN_CHANGE_PASSWORD';
export const ADMIN_CHANGE_PASSWORD_SUCCESS = 'silverspoon-frontend/Admin/Profile/ADMIN_CHANGE_PASSWORD_SUCCESS';
export const ADMIN_CHANGE_PASSWORD_ERROR = 'silverspoon-frontend/Admin/Profile/ADMIN_CHANGE_PASSWORD_ERROR';

export const ADMIN_PROFILE_REMOVE_ERROR = 'silverspoon-frontend/Admin/Profile/ADMIN_PROFILE_REMOVE_ERROR';