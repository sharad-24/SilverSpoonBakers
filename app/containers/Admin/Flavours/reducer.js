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
  // ADMIN_STAFF_FETCH, ADMIN_STAFF_FETCH_SUCCESS, ADMIN_STAFF_FETCH_ERROR, 
  ADMIN_FLAVOURS_ADD, ADMIN_FLAVOURS_ADD_SUCCESS, ADMIN_FLAVOURS_ADD_ERROR,
  ADMIN_FLAVOURS_EDIT,ADMIN_FLAVOURS_EDIT_SUCCESS,ADMIN_FLAVOURS_EDIT_ERROR,
  ADMIN_FLAVOURS_DELETE, ADMIN_FLAVOURS_DELETE_SUCCESS, ADMIN_FLAVOURS_DELETE_ERROR,

  ADMIN_FLAVOURS_REMOVE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  flavours: null,
  flavoursAdd: {
    loading: false,
    error: false,
    success: false,
  },
  flavoursEdit: {
    loading: false,
    error: false,
    success: false,
  },
  flavoursDelete: {
    loading: false,
    error: false,
    success: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const adminFlavoursReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_FLAVOURS_ADD:
        draft.flavoursAdd.loading = true;
        draft.flavoursAdd.error = false;
        draft.flavoursAdd.success = false;
        break;

      case ADMIN_FLAVOURS_ADD_SUCCESS:
        draft.flavoursAdd.loading = false;
        draft.flavoursAdd.success = true;
        break;

      case ADMIN_FLAVOURS_ADD_ERROR:
        draft.flavoursAdd.error = action.error;
        draft.flavoursAdd.loading = false;
        break;

      case ADMIN_FLAVOURS_EDIT:
        draft.flavoursEdit.loading = true;
        draft.flavoursEdit.error = false;
        draft.flavoursEdit.success = false;
        break;

      case ADMIN_FLAVOURS_EDIT_SUCCESS:
        draft.flavoursEdit.loading = false;
        draft.flavoursEdit.success = true;
        break;

      case ADMIN_FLAVOURS_EDIT_ERROR:
        draft.flavoursEdit.error = action.error;
        draft.flavoursEdit.loading = false;
        break;

      case ADMIN_FLAVOURS_DELETE:
        draft.flavoursDelete.loading = true;
        draft.flavoursDelete.error = false;
        draft.flavoursDelete.success = false;
        break;

      case ADMIN_FLAVOURS_DELETE_SUCCESS:
        draft.flavoursDelete.loading = false;
        draft.flavoursDelete.success = true;
        break;

      case ADMIN_FLAVOURS_DELETE_ERROR:
        draft.flavoursDelete.error = action.error;
        draft.flavoursDelete.loading = false;
        break;

        case ADMIN_FLAVOURS_REMOVE_ERROR:
        draft.flavoursDelete.error = false;
        draft.flavoursEdit.error = false;
        draft.flavoursAdd.error = false;
        
        break;
    }
  });

export default adminFlavoursReducer;