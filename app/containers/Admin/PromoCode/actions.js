/*
 * Admin Promo Code Actions
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
  ADMIN_PROMO_CODE_FETCH, ADMIN_PROMO_CODE_FETCH_SUCCESS, ADMIN_PROMO_CODE_FETCH_ERROR,
  ADMIN_ALL_SUBCATEGORIES_FETCH, ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS, ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR, 
  ADMIN_PROMO_CODE_ADD, ADMIN_PROMO_CODE_ADD_SUCCESS, ADMIN_PROMO_CODE_ADD_ERROR,
  ADMIN_PROMO_CODE_EDIT, ADMIN_PROMO_CODE_EDIT_SUCCESS, ADMIN_PROMO_CODE_EDIT_ERROR,
  ADMIN_PROMO_CODE_DELETE, ADMIN_PROMO_CODE_DELETE_SUCCESS, ADMIN_PROMO_CODE_DELETE_ERROR,

  ADMIN_PROMO_CODE_REMOVE_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PROMO_CODE
 */
export function adminPromoCodeFetch() {
  return {
    type: ADMIN_PROMO_CODE_FETCH,
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
export function adminPromoCodeFetchSuccess(data) {
  return {
    type: ADMIN_PROMO_CODE_FETCH_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PROMO_CODE_ERROR passing the error
 */
export function adminPromoCodeFetchError(error) {
  return {
    type: ADMIN_PROMO_CODE_FETCH_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PROMO_CODE
 */
export function adminAllSubcategoriesFetch() {
  return {
    type: ADMIN_ALL_SUBCATEGORIES_FETCH,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_ALL_SUBCATEGORIES_SUCCESS passing the repos
 */
export function adminAllSubcategoriesFetchSuccess(data) {
  return {
    type: ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_ALL_SUBCATEGORIES_ERROR passing the error
 */
export function adminAllSubcategoriesFetchError(error) {
  return {
    type: ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PROMO_CODE
 */
export function adminPromoCodeAdd(data, onPromoCodeAddSuccess) {
  return {
    type: ADMIN_PROMO_CODE_ADD,
    data,
    onPromoCodeAddSuccess
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
export function adminPromoCodeAddSuccess() {
  return {
    type: ADMIN_PROMO_CODE_ADD_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PROMO_CODE_ERROR passing the error
 */
export function adminPromoCodeAddError(error) {
  return {
    type: ADMIN_PROMO_CODE_ADD_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PROMO_CODE
 */
export function adminPromoCodeEdit(data, onPromoCodeEditSuccess) {
  return {
    type: ADMIN_PROMO_CODE_EDIT,
    data,
    onPromoCodeEditSuccess
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
export function adminPromoCodeEditSuccess() {
  return {
    type: ADMIN_PROMO_CODE_EDIT_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PROMO_CODE_ERROR passing the error
 */
export function adminPromoCodeEditError(error) {
  return {
    type: ADMIN_PROMO_CODE_EDIT_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminPromoCodeDelete(data, onPromoCodeDeleteSuccess) {
  return {
    type: ADMIN_PROMO_CODE_DELETE,
    data,
    onPromoCodeDeleteSuccess,
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
export function adminPromoCodeDeleteSuccess() {
  return {
    type: ADMIN_PROMO_CODE_DELETE_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminPromoCodeDeleteError(error) {
  return {
    type: ADMIN_PROMO_CODE_DELETE_ERROR,
    error,
  };
}

export function adminPromoCodeRemoveError() {
  return {
    type: ADMIN_PROMO_CODE_REMOVE_ERROR,
  };
}