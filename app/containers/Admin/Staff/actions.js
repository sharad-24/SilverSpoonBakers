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
  ADMIN_STAFF_FETCH, ADMIN_STAFF_FETCH_SUCCESS, ADMIN_STAFF_FETCH_ERROR, 
  ADMIN_STAFF_ADD, ADMIN_STAFF_ADD_SUCCESS, ADMIN_STAFF_ADD_ERROR,
  ADMIN_STAFF_DELETE, ADMIN_STAFF_DELETE_SUCCESS, ADMIN_STAFF_DELETE_ERROR,

  ADMIN_STAFF_REMOVE_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminStaffFetch() {
  return {
    type: ADMIN_STAFF_FETCH,
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
export function adminStaffFetchSuccess(data) {
  return {
    type: ADMIN_STAFF_FETCH_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminStaffFetchError(error) {
  return {
    type: ADMIN_STAFF_FETCH_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminStaffAdd(data, onStaffAddSuccess) {
  return {
    type: ADMIN_STAFF_ADD,
    data,
    onStaffAddSuccess
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
export function adminStaffAddSuccess() {
  return {
    type: ADMIN_STAFF_ADD_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminStaffAddError(error) {
  return {
    type: ADMIN_STAFF_ADD_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminStaffDelete(data, onStaffDeleteSuccess) {
  return {
    type: ADMIN_STAFF_DELETE,
    data,
    onStaffDeleteSuccess
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
export function adminStaffDeleteSuccess() {
  return {
    type: ADMIN_STAFF_DELETE_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminStaffDeleteError(error) {
  return {
    type: ADMIN_STAFF_DELETE_ERROR,
    error,
  };
}

export function adminStaffRemoveError() {
  return {
    type: ADMIN_STAFF_REMOVE_ERROR,
  };
}