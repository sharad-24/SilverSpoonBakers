/*
 * Admin Categories Actions
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
  ADMIN_CATEGORY_FETCH, ADMIN_CATEGORY_FETCH_SUCCESS, ADMIN_CATEGORY_FETCH_ERROR, 
  ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_ADD_SUCCESS, ADMIN_CATEGORY_ADD_ERROR,
  ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_EDIT_SUCCESS, ADMIN_CATEGORY_EDIT_ERROR,
  ADMIN_CATEGORY_DELETE, ADMIN_CATEGORY_DELETE_SUCCESS, ADMIN_CATEGORY_DELETE_ERROR,

  ADMIN_SUBCATEGORY_FETCH, ADMIN_SUBCATEGORY_FETCH_SUCCESS, ADMIN_SUBCATEGORY_FETCH_ERROR,
  ADMIN_SUBCATEGORY_ADD, ADMIN_SUBCATEGORY_ADD_SUCCESS, ADMIN_SUBCATEGORY_ADD_ERROR,
  ADMIN_SUBCATEGORY_EDIT, ADMIN_SUBCATEGORY_EDIT_SUCCESS, ADMIN_SUBCATEGORY_EDIT_ERROR,
  ADMIN_SUBCATEGORY_DELETE, ADMIN_SUBCATEGORY_DELETE_SUCCESS, ADMIN_SUBCATEGORY_DELETE_ERROR,

  ADMIN_CATEGORY_REMOVE_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_CATEGORIES
 */
export function adminCategoryFetch() {
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
 * @return {object}      An action object with a type of ADMIN_CATEGORIES_SUCCESS passing the repos
 */
export function adminCategoryFetchSuccess(data) {
  return {
    type: ADMIN_CATEGORY_FETCH_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_CATEGORIES_ERROR passing the error
 */
export function adminCategoryFetchError(error) {
  return {
    type: ADMIN_CATEGORY_FETCH_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_CATEGORIES
 */
export function adminCategoryAdd(data, onCategoryAddSuccess) {
  return {
    type: ADMIN_CATEGORY_ADD,
    data,
    onCategoryAddSuccess
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_CATEGORIES_SUCCESS passing the repos
 */
export function adminCategoryAddSuccess() {
  return {
    type: ADMIN_CATEGORY_ADD_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_CATEGORIES_ERROR passing the error
 */
export function adminCategoryAddError(error) {
  return {
    type: ADMIN_CATEGORY_ADD_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_CATEGORIES
 */
export function adminCategoryEdit(data, onCategoryEditSuccess) {
  return {
    type: ADMIN_CATEGORY_EDIT,
    data,
    onCategoryEditSuccess
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_CATEGORIES_SUCCESS passing the repos
 */
export function adminCategoryEditSuccess() {
  return {
    type: ADMIN_CATEGORY_EDIT_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_CATEGORIES_ERROR passing the error
 */
export function adminCategoryEditError(error) {
  return {
    type: ADMIN_CATEGORY_EDIT_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminCategoryDelete(data, onCategoryDeleteSuccess1, onCategoryDeleteSuccess2) {
  return {
    type: ADMIN_CATEGORY_DELETE,
    data,
    onCategoryDeleteSuccess1,
    onCategoryDeleteSuccess2
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
export function adminCategoryDeleteSuccess() {
  return {
    type: ADMIN_CATEGORY_DELETE_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminCategoryDeleteError(error) {
  return {
    type: ADMIN_CATEGORY_DELETE_ERROR,
    error,
  };
}


/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_CATEGORIES
 */
export function adminSubCategoryFetch() {
  return {
    type: ADMIN_SUBCATEGORY_FETCH,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_CATEGORIES_SUCCESS passing the repos
 */
export function adminSubCategoryFetchSuccess(data) {
  return {
    type: ADMIN_SUBCATEGORY_FETCH_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_CATEGORIES_ERROR passing the error
 */
export function adminSubCategoryFetchError(error) {
  return {
    type: ADMIN_SUBCATEGORY_FETCH_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_CATEGORIES
 */
export function adminSubCategoryAdd(data, onSubCategoryAddSuccess) {
  return {
    type: ADMIN_SUBCATEGORY_ADD,
    data,
    onSubCategoryAddSuccess
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_CATEGORIES_SUCCESS passing the repos
 */
export function adminSubCategoryAddSuccess() {
  return {
    type: ADMIN_SUBCATEGORY_ADD_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_CATEGORIES_ERROR passing the error
 */
export function adminSubCategoryAddError(error) {
  return {
    type: ADMIN_SUBCATEGORY_ADD_ERROR,
    error,
  };
}


/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_CATEGORIES
 */
export function adminSubCategoryEdit(data, onSubCategoryEditSuccess) {
  return {
    type: ADMIN_SUBCATEGORY_EDIT,
    data,
    onSubCategoryEditSuccess
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of ADMIN_CATEGORIES_SUCCESS passing the repos
 */
export function adminSubCategoryEditSuccess() {
  return {
    type: ADMIN_SUBCATEGORY_EDIT_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_CATEGORIES_ERROR passing the error
 */
export function adminSubCategoryEditError(error) {
  return {
    type: ADMIN_SUBCATEGORY_EDIT_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of ADMIN_STAFF
 */
export function adminSubCategoryDelete(data, onSubCategoryDeleteSuccess1, onSubCategoryDeleteSuccess2) {
  return {
    type: ADMIN_SUBCATEGORY_DELETE,
    data,
    onSubCategoryDeleteSuccess1,
    onSubCategoryDeleteSuccess2
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
export function adminSubCategoryDeleteSuccess() {
  return {
    type: ADMIN_SUBCATEGORY_DELETE_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADMIN_STAFF_ERROR passing the error
 */
export function adminSubCategoryDeleteError(error) {
  return {
    type: ADMIN_SUBCATEGORY_DELETE_ERROR,
    error,
  };
}

export function adminCategoryRemoveError() {
  return {
    type: ADMIN_CATEGORY_REMOVE_ERROR,
  };
}