/*
 * Admin Login Actions
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

import { ADMIN_LOGIN, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_ERROR } from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_LOGIN
 */
export function adminLogin(payload) {
  return {
    type: ADMIN_LOGIN,
    payload,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_LOGIN_SUCCESS passing the repos
 */
export function adminLoginSuccess() {
  return {
    type: ADMIN_LOGIN_SUCCESS
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_LOGIN_ERROR passing the error
 */
export function adminLoginError(error) {
  return {
    type: ADMIN_LOGIN_ERROR,
    error,
  };
}