/*
 * HomeLoginReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { HOME_LOGIN_SUCCESS, HOME_LOGIN, HOME_LOGIN_ERROR } from './constants';
import {
  HOME_FORGET_SUCCESS,
  HOME_FORGET,
  HOME_FORGET_ERROR,
  ADMIN_PRODUCTS_FETCH,
  ADMIN_PRODUCTS_FETCH_SUCCESS,
  ADMIN_PRODUCTS_FETCH_ERROR,
  ADMIN_CATEGORY_FETCH,
  ADMIN_CATEGORY_FETCH_SUCCESS,
  ADMIN_CATEGORY_FETCH_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
         loading: false,
         error: false,
         success: false,
         products: null,
         category: null,
       };

/* eslint-disable default-case, no-param-reassign */
const homeLoginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HOME_LOGIN:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;

      case HOME_LOGIN_SUCCESS:
        draft.loading = false;
        draft.success = true;
        break;

      case HOME_LOGIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

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

      case ADMIN_CATEGORY_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.category = null;
        break;

      case ADMIN_CATEGORY_FETCH_SUCCESS:
        draft.loading = false;
        draft.category = action.data;
        break;

      case ADMIN_CATEGORY_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

  const homeForgetPasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HOME_FORGET:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;

      case HOME_FORGET_SUCCESS:
        draft.loading = false;
        draft.success = true;
        break;

      case HOME_FORGET_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default homeLoginReducer;