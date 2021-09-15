/*
 * Admin Profile Actions
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
  ADMIN_PROFILE_FETCH,
  ADMIN_PROFILE_FETCH_SUCCESS,
  ADMIN_PROFILE_FETCH_ERROR,
  ADMIN_CHANGE_PASSWORD,
  ADMIN_CHANGE_PASSWORD_SUCCESS,
  ADMIN_CHANGE_PASSWORD_ERROR,

  ADMIN_PROFILE_REMOVE_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PROFILE
 */
export function adminProfileFetch() {
  return {
    type: ADMIN_PROFILE_FETCH,
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
export function adminProfileFetchSuccess(data) {
  return {
    type: ADMIN_PROFILE_FETCH_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminProfileFetchError(error) {
  return {
    type: ADMIN_PROFILE_FETCH_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminChangePassword(data, onChangePasswordSuccess) {
  return {
    type: ADMIN_CHANGE_PASSWORD,
    data,
    onChangePasswordSuccess
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
export function adminChangePasswordSuccess() {
  return {
    type: ADMIN_CHANGE_PASSWORD_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminChangePasswordError(error) {
  return {
    type: ADMIN_CHANGE_PASSWORD_ERROR,
    error,
  };
}

export function adminProfileRemoveError() {
  return {
    type: ADMIN_PROFILE_REMOVE_ERROR,
  };
}