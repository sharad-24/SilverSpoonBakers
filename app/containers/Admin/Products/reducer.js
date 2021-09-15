/*
 * AdminPRODUCTSReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  ADMIN_FLAVOURS_FETCH,
  ADMIN_FLAVOURS_FETCH_SUCCESS,
  ADMIN_FLAVOURS_FETCH_ERROR,
  ADMIN_PRODUCTS_FETCH,
  ADMIN_PRODUCTS_FETCH_SUCCESS,
  ADMIN_PRODUCTS_FETCH_ERROR,
  ADMIN_PRODUCTS_ADD,
  ADMIN_PRODUCTS_ADD_SUCCESS,
  ADMIN_PRODUCTS_ADD_ERROR,
  ADMIN_PRODUCTS_IMAGE_EDIT,
  ADMIN_PRODUCTS_IMAGE_EDIT_ERROR,
  ADMIN_PRODUCTS_IMAGE_EDIT_SUCCESS,
  ADMIN_PRODUCTS_EDIT,
  ADMIN_PRODUCTS_EDIT_SUCCESS,
  ADMIN_PRODUCTS_EDIT_ERROR,
  ADMIN_PRODUCTS_DELETE,
  ADMIN_PRODUCTS_DELETE_SUCCESS,
  ADMIN_PRODUCTS_DELETE_ERROR,
  ADMIN_ALL_SUBCATEGORIES_FETCH,
  ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS,
  ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR,
  ADMIN_PRODUCTS_REMOVE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
         loading: false,
         error: false,
         products: null,
         flavours: null,
         allSubcategories: null,
         productsAdd: {
           loading: false,
           error: false,
           success: false,
         },
         productsEdit: {
           loading: false,
           error: false,
           success: false,
         },
         productsImageEdit: {
           loading: false,
           error: false,
           success: false,
         },
         productsDelete: {
           loading: false,
           error: false,
           success: false,
         },
       };

/* eslint-disable default-case, no-param-reassign */
const adminProductsReducer = (state = initialState, action) =>
  produce(state, draft => {
 
    switch (action.type) {
      case ADMIN_PRODUCTS_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.products = null;
        break;

      case ADMIN_PRODUCTS_FETCH_SUCCESS:
        draft.loading = false;
        draft.products = action.data;
        break;

      case ADMIN_PRODUCTS_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADMIN_PRODUCTS_ADD:
        draft.productsAdd.loading = true;
        draft.productsAdd.error = false;
        draft.productsAdd.success = false;
        break;

      case ADMIN_PRODUCTS_ADD_SUCCESS:
        draft.productsAdd.loading = false;
        draft.productsAdd.success = true;
        break;

      case ADMIN_PRODUCTS_ADD_ERROR:
        draft.productsAdd.error = action.error;
        draft.productsAdd.loading = false;
        break;

      case ADMIN_PRODUCTS_EDIT:
        draft.productsEdit.loading = true;
        draft.productsEdit.error = false;
        draft.productsEdit.success = false;
        break;

      case ADMIN_PRODUCTS_EDIT_SUCCESS:
        draft.productsEdit.loading = false;
        draft.productsEdit.success = true;
        break;

      case ADMIN_PRODUCTS_EDIT_ERROR:
        draft.productsEdit.error = action.error;
        draft.productsEdit.loading = false;
        break;
      case ADMIN_PRODUCTS_IMAGE_EDIT:
        draft.productsImageEdit.loading = true;
        draft.productsImageEdit.error = false;
        draft.productsImageEdit.success = false;
        break;

      case ADMIN_PRODUCTS_IMAGE_EDIT_SUCCESS:
        draft.productsImageEdit.loading = false;
        draft.productsImageEdit.success = true;
        break;

      case ADMIN_PRODUCTS_IMAGE_EDIT_ERROR:
        draft.productsImageEdit.error = action.error;
        draft.productsImageEdit.loading = false;
        break;
      case ADMIN_PRODUCTS_DELETE:
        draft.productsDelete.loading = true;
        draft.productsDelete.error = false;
        draft.productsDelete.success = false;
        break;

      case ADMIN_PRODUCTS_DELETE_SUCCESS:
        draft.productsDelete.loading = false;
        draft.productsDelete.success = true;
        break;

      case ADMIN_PRODUCTS_DELETE_ERROR:
        draft.productsDelete.error = action.error;
        draft.productsDelete.loading = false;
        break;

      case ADMIN_ALL_SUBCATEGORIES_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.allSubcategories = null;
        break;

      case ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS:
        draft.loading = false;
        draft.allSubcategories = action.data;
        break;

      case ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADMIN_FLAVOURS_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.flavours = null;
        break;

      case ADMIN_FLAVOURS_FETCH_SUCCESS:
        draft.loading = false;
        draft.flavours = action.data;
        break;

      case ADMIN_FLAVOURS_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADMIN_PRODUCTS_REMOVE_ERROR:
        draft.error = false;
        draft.productsAdd.error = false;
        draft.productsEdit.error = false;
        draft.productsDelete.error = false;
        break;
    }
  });

export default adminProductsReducer;