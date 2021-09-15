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

// The initial state of the App
export const initialState = {
         loading: false,
         error: false,
         customOrder: null,

         customOrderEdit: {
           loading: false,
           error: false,
           success: false,
         },
         customOrderDelete: {
           loading: false,
           error: false,
           success: false,
         },
       };

/* eslint-disable default-case, no-param-reassign */
const admincustomOrderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_CUSTOM_ORDER_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.customOrder = null;
        break;

      case ADMIN_CUSTOM_ORDER_FETCH_SUCCESS:
        draft.loading = false;
        draft.customOrder = action.data;
        break;

      case ADMIN_CUSTOM_ORDER_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADMIN_CUSTOM_ORDER_EDIT:
        draft.customOrderEdit.loading = true;
        draft.customOrderEdit.error = false;
        draft.customOrderEdit.success = false;
        break;

      case ADMIN_CUSTOM_ORDER_EDIT_SUCCESS:
        draft.customOrderEdit.loading = false;
        draft.customOrderEdit.success = true;
        break;

      case ADMIN_CUSTOM_ORDER_EDIT_ERROR:
        draft.customOrderEdit.error = action.error;
        draft.customOrderEdit.loading = false;
        break;

      case ADMIN_CUSTOM_ORDER_DELETE:
        draft.customOrderDelete.loading = true;
        draft.customOrderDelete.error = false;
        draft.customOrderDelete.success = false;
        break;

      case ADMIN_CUSTOM_ORDER_DELETE_SUCCESS:
        draft.customOrderDelete.loading = false;
        draft.customOrderDelete.success = true;
        break;

      case ADMIN_CUSTOM_ORDER_DELETE_ERROR:
        draft.customOrderDelete.error = action.error;
        draft.customOrderDelete.loading = false;
        break;
    }
  });

export default admincustomOrderReducer;