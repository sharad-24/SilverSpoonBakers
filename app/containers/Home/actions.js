/*
 * Home Login Actions
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
  HOME_LOGIN,
  HOME_LOGIN_SUCCESS,
  HOME_LOGIN_ERROR,
  HOME_FORGET,
  HOME_FORGET_SUCCESS,
  HOME_FORGET_ERROR,
  ADMIN_PRODUCTS_FETCH,
  ADMIN_PRODUCTS_FETCH_SUCCESS,
  ADMIN_PRODUCTS_FETCH_ERROR,
  ADMIN_CATEGORY_FETCH,
  ADMIN_CATEGORY_FETCH_SUCCESS,
  ADMIN_CATEGORY_FETCH_ERROR,
} from './constants';


/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of HOME_LOGIN
 */
export function homeLogin(payload) {
  return {
    type: HOME_LOGIN,
    payload,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of home_LOGIN
 */
export function homeForgetPassword(payload) {
  return {
    type: HOME_FORGET,
    payload,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of HOME_LOGIN_SUCCESS passing the repos
 */
export function homeLoginSuccess() {
  return {
    type: HOME_LOGIN_SUCCESS
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of HOME_LOGIN_SUCCESS passing the repos
 */
export function homeForgetPasswordSuccess() {
  return {
    type: HOME_FORGET_SUCCESS
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of HOME_LOGIN_ERROR passing the error
 */
export function homeLoginError(error) {
  return {
    type: HOME_LOGIN_ERROR,
    error,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of HOME_LOGIN_ERROR passing the error
 */
export function homeForgetPasswordError(error) {
  return {
    type: HOME_FORGET_ERROR,
    error,
  };
}

export function adminProductsFetch() {
  return {
    type: ADMIN_PRODUCTS_FETCH,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_PRODUCTS_SUCCESS passing the repos
 */
export function adminProductsFetchSuccess(data) {
  return {
    type: ADMIN_PRODUCTS_FETCH_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PRODUCTS_ERROR passing the error
 */
export function adminProductsFetchError(error) {
  return {
    type: ADMIN_PRODUCTS_FETCH_ERROR,
    error,
  };
}

export function categoryFetch() {
  return {
    type: ADMIN_CATEGORY_FETCH,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_CATEGORY_SUCCESS passing the repos
 */
export function categoryFetchSuccess(data) {
  return {
    type: ADMIN_CATEGORY_FETCH_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_CATEGORY_ERROR passing the error
 */
export function categoryFetchError(error) {
  return {
    type: ADMIN_CATEGORY_FETCH_ERROR,
    error,
  };
}