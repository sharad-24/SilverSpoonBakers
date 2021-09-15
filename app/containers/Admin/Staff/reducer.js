/*
 * AdminStaffReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  ADMIN_STAFF_FETCH, ADMIN_STAFF_FETCH_SUCCESS, ADMIN_STAFF_FETCH_ERROR, 
  ADMIN_STAFF_ADD, ADMIN_STAFF_ADD_SUCCESS, ADMIN_STAFF_ADD_ERROR,
  ADMIN_STAFF_DELETE, ADMIN_STAFF_DELETE_SUCCESS, ADMIN_STAFF_DELETE_ERROR,
  
  ADMIN_STAFF_REMOVE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  staff: null,
  staffAdd: {
    loading: false,
    error: false,
    success: false,
  },
  staffDelete: {
    loading: false,
    error: false,
    success: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const adminStaffReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_STAFF_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.staff = null;
        break;

      case ADMIN_STAFF_FETCH_SUCCESS:
        draft.loading = false;
        draft.staff = action.data;
        break;

      case ADMIN_STAFF_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADMIN_STAFF_ADD:
        draft.staffAdd.loading = true;
        draft.staffAdd.error = false;
        draft.staffAdd.success = false;
        break;

      case ADMIN_STAFF_ADD_SUCCESS:
        draft.staffAdd.loading = false;
        draft.staffAdd.success = true;
        break;

      case ADMIN_STAFF_ADD_ERROR:
        draft.staffAdd.error = action.error;
        draft.staffAdd.loading = false;
        break;

      case ADMIN_STAFF_DELETE:
        draft.staffDelete.loading = true;
        draft.staffDelete.error = false;
        draft.staffDelete.success = false;
        break;

      case ADMIN_STAFF_DELETE_SUCCESS:
        draft.staffDelete.loading = false;
        draft.staffDelete.success = true;
        break;

      case ADMIN_STAFF_DELETE_ERROR:
        draft.staffDelete.error = action.error;
        draft.staffDelete.loading = false;
        break;

      case ADMIN_STAFF_REMOVE_ERROR:
        draft.error = false;
        draft.staffDelete.error = false;
        draft.staffAdd.error = false;
        break;
    }
  });

export default adminStaffReducer;