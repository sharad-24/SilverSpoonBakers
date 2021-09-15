/*
 * Admin Product Actions
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
  ADMIN_CUSTOM_ORDER_FETCH,
  ADMIN_CUSTOM_ORDER_FETCH_SUCCESS,
  ADMIN_CUSTOM_ORDER_FETCH_ERROR,
  ADMIN_CUSTOM_ORDER_EDIT,
  ADMIN_CUSTOM_ORDER_EDIT_SUCCESS,
  ADMIN_CUSTOM_ORDER_EDIT_ERROR,
  ADMIN_CUSTOM_ORDER_DELETE,
  ADMIN_CUSTOM_ORDER_DELETE_SUCCESS,
  ADMIN_CUSTOM_ORDER_DELETE_ERROR,
} from './constants';



// /**
//  * Load the repositories, this action starts the request saga
//  *
//  * @return {object} An action object with a type of ADMIN_PRODUCTS
//  */


// /**
//  * Dispatched when the repositories are loaded by the request saga
//  *
//  * @param  {array} repos The repository data
//  * @param  {string} username The current username
//  *
//  * @return {object}      An action object with a type of ADMIN_PRODUCTS_SUCCESS passing the repos
//  */


// /**
//  * Dispatched when loading the repositories fails
//  *
//  * @param  {object} error The error
//  *
//  * @return {object}       An action object with a type of ADMIN_PRODUCTS_ERROR passing the error
//  */
export function adminCustomOrderFetch() {
  return {
    type: ADMIN_CUSTOM_ORDER_FETCH,
  };
}

export function adminCustomOrderFetchSuccess(data) {
  return {
    type: ADMIN_CUSTOM_ORDER_FETCH_SUCCESS,
    data,
  };
}

export function adminCustomOrderFetchError(error) {
  return {
    type: ADMIN_CUSTOM_ORDER_FETCH_ERROR,
    error,
  };
}

export function admincustomOrderEdit(data, oncustomOrderEditSuccess) {
  return {
    type: ADMIN_CUSTOM_ORDER_EDIT,
    data,
    oncustomOrderEditSuccess,
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
export function admincustomOrderEditSuccess() {
  return {
    type: ADMIN_CUSTOM_ORDER_EDIT_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PROMO_CODE_ERROR passing the error
 */
export function admincustomOrderEditError(error) {
  return {
    type: ADMIN_CUSTOM_ORDER_EDIT_ERROR,
    error,
  };
}


/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PRODUCTS
 */
export function admincustomOrderDelete(data, oncustomOrderDeleteSuccess) {
  return {
    type: ADMIN_CUSTOM_ORDER_DELETE,
    data,
    oncustomOrderDeleteSuccess
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
export function admincustomOrderDeleteSuccess() {
  return {
    type: ADMIN_CUSTOM_ORDER_DELETE_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PRODUCTS_ERROR passing the error
 */
export function admincustomOrderDeleteError(error) {
  return {
    type: ADMIN_CUSTOM_ORDER_DELETE_ERROR,
    error,
  };
}

