/*
 * Admin Order Actions
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
  ADMIN_ORDERS_FETCH,
  ADMIN_ORDERS_FETCH_SUCCESS,
  ADMIN_ORDERS_FETCH_ERROR,
  ADMIN_ORDERS_ADD,
  ADMIN_ORDERS_ADD_SUCCESS,
  ADMIN_ORDERS_ADD_ERROR,
  ADMIN_ORDERS_DELETE,
  ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS,
  ADMIN_ALL_SUBCATEGORIES_FETCH,
  ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR,
  ADMIN_ORDERS_EDIT,
  ADMIN_ORDERS_EDIT_SUCCESS,
  ADMIN_ORDERS_EDIT_ERROR,
  ADMIN_ORDERS_DELETE_SUCCESS,
  ADMIN_ORDERS_DELETE_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_OrderS
 */
export function adminOrdersFetch() {
  return {
    type: ADMIN_ORDERS_FETCH,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_OrderS_SUCCESS passing the repos
 */
export function adminOrdersFetchSuccess(data) {
  return {
    type: ADMIN_ORDERS_FETCH_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_ORDERS_ERROR passing the error
 */
export function adminOrdersFetchError(error) {
  return {
    type: ADMIN_ORDERS_FETCH_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_OrderS
 */
export function adminOrdersAdd(data, onOrdersAddSuccess) {
  return {
    type: ADMIN_ORDERS_ADD,
    data,
    onOrdersAddSuccess,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_OrderS_SUCCESS passing the repos
 */
export function adminOrdersAddSuccess() {
  return {
    type: ADMIN_ORDERS_ADD_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_OrderS_ERROR passing the error
 */
export function adminOrdersAddError(error) {
  return {
    type: ADMIN_ORDERS_ADD_ERROR,
    error,
  };
}

export function adminOrdersEdit(data, onOrderEditSuccess) {
  return {
    type: ADMIN_ORDERS_EDIT,
    data,
    onOrderEditSuccess,
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
export function adminOrdersEditSuccess() {
  return {
    type: ADMIN_ORDERS_EDIT_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PROMO_CODE_ERROR passing the error
 */
export function adminOrdersEditError(error) {
  return {
    type: ADMIN_ORDERS_EDIT_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_OrderS
 */
export function adminOrdersDelete(data, onOrdersDeleteSuccess) {
  return {
    type: ADMIN_ORDERS_DELETE,
    data,
    onOrdersDeleteSuccess,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_OrderS_SUCCESS passing the repos
 */
export function adminOrdersDeleteSuccess() {
  return {
    type: ADMIN_ORDERS_DELETE_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_OrderS_ERROR passing the error
 */
export function adminOrdersDeleteError(error) {
  return {
    type: ADMIN_ORDERS_DELETE_ERROR,
    error,
  };
}

export function adminAllSubcategoriesFetch() {
  return {
    type: ADMIN_ALL_SUBCATEGORIES_FETCH,
  };
}

export function adminAllSubcategoriesFetchSuccess(data) {
  return {
    type: ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS,
    data,
  };
}

export function adminAllSubcategoriesFetchError(error) {
  return {
    type: ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR,
    error,
  };
}
