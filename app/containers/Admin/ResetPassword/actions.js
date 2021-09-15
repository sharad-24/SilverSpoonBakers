/*
 * Admin ResetPassword Actions
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

import { ADMIN_RESET_PASSWORD, ADMIN_RESET_PASSWORD_SUCCESS, ADMIN_RESET_PASSWORD_ERROR } from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_LOGIN
 */
export function adminResetPassword(payload) {
  return {
    type: ADMIN_RESET_PASSWORD,
    payload,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} OTP The current OTP
 *
 * @return {object}      An action object with a type of ADMIN_LOGIN_SUCCESS passing the repos
 */
export function adminResetPasswordSuccess() {
  return {
    type: ADMIN_RESET_PASSWORD_SUCCESS
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_LOGIN_ERROR passing the error
 */
export function adminResetPasswordError(error) {
  return {
    type: ADMIN_RESET_PASSWORD_ERROR,
    error,
  };
}