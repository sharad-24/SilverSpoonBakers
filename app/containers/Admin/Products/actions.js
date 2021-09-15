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

import { func } from 'prop-types';
import {
  ADMIN_PRODUCTS_FETCH,
  ADMIN_PRODUCTS_FETCH_SUCCESS,
  ADMIN_PRODUCTS_FETCH_ERROR,
  ADMIN_FLAVOURS_FETCH,
  ADMIN_FLAVOURS_FETCH_SUCCESS,
  ADMIN_FLAVOURS_FETCH_ERROR,
  ADMIN_PRODUCTS_ADD,
  ADMIN_PRODUCTS_ADD_SUCCESS,
  ADMIN_PRODUCTS_ADD_ERROR,
  ADMIN_PRODUCTS_DELETE,
  ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS,
  ADMIN_ALL_SUBCATEGORIES_FETCH,
  ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR,
  ADMIN_PRODUCTS_IMAGE_EDIT,
  ADMIN_PRODUCTS_IMAGE_EDIT_ERROR,
  ADMIN_PRODUCTS_IMAGE_EDIT_SUCCESS,
  ADMIN_PRODUCTS_EDIT,
  ADMIN_PRODUCTS_EDIT_SUCCESS,
  ADMIN_PRODUCTS_EDIT_ERROR,
  ADMIN_PRODUCTS_DELETE_SUCCESS,
  ADMIN_PRODUCTS_DELETE_ERROR,
  ADMIN_PRODUCTS_REMOVE_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PRODUCTS
 */
 

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
    data
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

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PRODUCTS
 */
export function adminProductsAdd(data, onProductsAddSuccess) {
  return {
    type: ADMIN_PRODUCTS_ADD,
    data,
    onProductsAddSuccess
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
export function adminProductsAddSuccess() {
  return {
    type: ADMIN_PRODUCTS_ADD_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PRODUCTS_ERROR passing the error
 */
export function adminProductsAddError(error) {
  return {
    type: ADMIN_PRODUCTS_ADD_ERROR,
    error,
  };
}

export function adminProductsEdit(data, onProductEditSuccess) {
  return {
    type: ADMIN_PRODUCTS_EDIT,
    data,
    onProductEditSuccess,
  };
}


export function adminProductsImageEdit(data, onProductImageEditSuccess) {
  return {
    type: ADMIN_PRODUCTS_IMAGE_EDIT,
    data,
    onProductImageEditSuccess,
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
export function adminProductsEditSuccess() {
  return {
    type: ADMIN_PRODUCTS_EDIT_SUCCESS,
  };
}

export function adminProductsImageEditSuccess() {
  return {
    type: ADMIN_PRODUCTS_IMAGE_EDIT_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PROMO_CODE_ERROR passing the error
 */
export function adminProductsEditError(error) {
  return {
    type: ADMIN_PRODUCTS_EDIT_ERROR,
    error,
  };
}

export function adminProductsImageEditError(error) {
  return {
    type: ADMIN_PRODUCTS_IMAGE_EDIT_ERROR,
    error,
  };
}


/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_PRODUCTS
 */
export function adminProductsDelete(data, onProductsDeleteSuccess) {
  return {
    type: ADMIN_PRODUCTS_DELETE,
    data,
    onProductsDeleteSuccess
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
export function adminProductsDeleteSuccess() {
  return {
    type: ADMIN_PRODUCTS_DELETE_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_PRODUCTS_ERROR passing the error
 */
export function adminProductsDeleteError(error) {
  return {
    type: ADMIN_PRODUCTS_DELETE_ERROR,
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

export function adminProductsRemoveError() {
  return {
    type: ADMIN_PRODUCTS_REMOVE_ERROR,
  };
}

export function adminFlavoursFetch() {
  return {
    type: ADMIN_FLAVOURS_FETCH,
  };
}

export function adminFlavoursFetchSucess(data) {
  return {
    type: ADMIN_FLAVOURS_FETCH_SUCCESS,
    data,
  };
}

export function adminFlavoursFetchError(error) {
  return {
    type: ADMIN_FLAVOURS_FETCH_ERROR,
    error,
  };
}