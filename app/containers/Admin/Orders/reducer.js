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
  ADMIN_ORDERS_FETCH,
  ADMIN_ORDERS_FETCH_SUCCESS,
  ADMIN_ORDERS_FETCH_ERROR,
  ADMIN_ORDERS_ADD,
  ADMIN_ORDERS_ADD_SUCCESS,
  ADMIN_ORDERS_ADD_ERROR,
  ADMIN_ORDERS_EDIT,
  ADMIN_ORDERS_EDIT_SUCCESS,
  ADMIN_ORDERS_EDIT_ERROR,
  ADMIN_ORDERS_DELETE,
  ADMIN_ORDERS_DELETE_SUCCESS,
  ADMIN_ORDERS_DELETE_ERROR,
  ADMIN_ALL_SUBCATEGORIES_FETCH,
  ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS,
  ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  orders: null,
  allSubcategories: null,
  ordersAdd: {
    loading: false,
    error: false,
    success: false,
  },
  ordersEdit: {
    loading: false,
    error: false,
    success: false,
  },
  ordersDelete: {
    loading: false,
    error: false,
    success: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const adminOrdersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_ORDERS_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.ORDERS = null;
        break;

      case ADMIN_ORDERS_FETCH_SUCCESS:
        draft.loading = false;
        draft.ORDERS = action.data;
        break;

      case ADMIN_ORDERS_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADMIN_ORDERS_ADD:
        draft.ordersAdd.loading = true;
        draft.ordersAdd.error = false;
        draft.ordersAdd.success = false;
        break;

      case ADMIN_ORDERS_ADD_SUCCESS:
        draft.ordersAdd.loading = false;
        draft.ordersAdd.success = true;
        break;

      case ADMIN_ORDERS_ADD_ERROR:
        draft.ordersAdd.error = action.error;
        draft.ordersAdd.loading = false;
        break;

      case ADMIN_ORDERS_EDIT:
        draft.ordersEdit.loading = true;
        draft.ordersEdit.error = false;
        draft.ordersEdit.success = false;
        break;

      case ADMIN_ORDERS_EDIT_SUCCESS:
        draft.ordersEdit.loading = false;
        draft.ordersEdit.success = true;
        break;

      case ADMIN_ORDERS_EDIT_ERROR:
        draft.ordersEdit.error = action.error;
        draft.ordersEdit.loading = false;
        break;

      case ADMIN_ORDERS_DELETE:
        draft.ordersDelete.loading = true;
        draft.ordersDelete.error = false;
        draft.ordersDelete.success = false;
        break;

      case ADMIN_ORDERS_DELETE_SUCCESS:
        draft.ordersDelete.loading = false;
        draft.ordersDelete.success = true;
        break;

      case ADMIN_ORDERS_DELETE_ERROR:
        draft.ordersDelete.error = action.error;
        draft.ordersDelete.loading = false;
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
    }
  });

export default adminOrdersReducer;
