/*
 * Admin Staff Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { 
  ADMIN_FLAVOURS_FETCH, ADMIN_FLAVOURS_FETCH_SUCCESS, ADMIN_FLAVOURS_FETCH_ERROR, 
  ADMIN_FLAVOURS_ADD, ADMIN_FLAVOURS_ADD_SUCCESS, ADMIN_FLAVOURS_ADD_ERROR,
  ADMIN_FLAVOURS_EDIT,ADMIN_FLAVOURS_EDIT_SUCCESS,ADMIN_FLAVOURS_EDIT_ERROR,
  ADMIN_FLAVOURS_DELETE, ADMIN_FLAVOURS_DELETE_SUCCESS, ADMIN_FLAVOURS_DELETE_ERROR,

  ADMIN_FLAVOURS_REMOVE_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_FLAVOURS
 */
// export function adminStaffFetch() {
//   return {
//     type: ADMIN_FLAVOURS_FETCH,
//   };
// }

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_FLAVOURS_SUCCESS passing the repos
 */
// export function adminStaffFetchSuccess(data) {
//   return {
//     type: ADMIN_STAFF_FETCH_SUCCESS,
//     data
//   };
// }

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminFlavoursFetchError(error) {
  return {
    type: ADMIN_FLAVOURS_FETCH_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminFlavoursAdd(data, onFlavoursAddSuccess) {
  return {
    type: ADMIN_FLAVOURS_ADD,
    data,
    onFlavoursAddSuccess
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_STAFF_SUCCESS passing the repos
 */
export function adminFlavoursAddSuccess() {
  return {
    type: ADMIN_FLAVOURS_ADD_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminFlavoursAddError(error) {
  return {
    type: ADMIN_FLAVOURS_ADD_ERROR,
    error,
  };
}

export function adminFlavoursEdit(data, onFlavoursEditSuccess) {
  return {
    type: ADMIN_FLAVOURS_EDIT,
    data,
    onFlavoursEditSuccess,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_PROMO_CODE_SUCCESS passing the repos
 */
export function adminFlavoursEditSuccess() {
  return {
    type: ADMIN_FLAVOURS_EDIT_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PROMO_CODE_ERROR passing the error
 */
export function adminFlavoursEditError(error) {
  return {
    type: ADMIN_FLAVOURS_EDIT_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminFlavoursDelete(data, onFlavoursDeleteSuccess) {
  return {
    type: ADMIN_FLAVOURS_DELETE,
    data,
    onFlavoursDeleteSuccess
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_STAFF_SUCCESS passing the repos
 */
export function adminFlavoursDeleteSuccess() {
  return {
    type: ADMIN_FLAVOURS_DELETE_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminFlavoursDeleteError(error) {
  return {
    type: ADMIN_FLAVOURS_DELETE_ERROR,
    error,
  };
}

export function adminFlavoursRemoveError() {
  return {
    type: ADMIN_FLAVOURS_REMOVE_ERROR,
  };
}