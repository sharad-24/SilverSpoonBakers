/*
 * AdminProfileReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To Update a new action,
 * Update it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  ADMIN_PROFILE_FETCH,
  ADMIN_PROFILE_FETCH_SUCCESS,
  ADMIN_PROFILE_FETCH_ERROR,
  ADMIN_CHANGE_PASSWORD,
  ADMIN_CHANGE_PASSWORD_SUCCESS,
  ADMIN_CHANGE_PASSWORD_ERROR,

  ADMIN_PROFILE_REMOVE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  profile: null,
  changePasssword: {
    loading: false,
    error: false,
    success: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const adminProfileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_PROFILE_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.profile = null;
        break;

      case ADMIN_PROFILE_FETCH_SUCCESS:
        draft.loading = false;
        draft.profile = action.data;
        break;

      case ADMIN_PROFILE_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADMIN_CHANGE_PASSWORD:
        draft.changePasssword.loading = true;
        draft.changePasssword.error = false;
        draft.changePasssword.success = false;
        break;

      case ADMIN_CHANGE_PASSWORD_SUCCESS:
        draft.changePasssword.loading = false;
        draft.changePasssword.success = true;
        break;

      case ADMIN_CHANGE_PASSWORD_ERROR:
        draft.changePasssword.error = action.error;
        draft.changePasssword.loading = false;
        break;

      case ADMIN_PROFILE_REMOVE_ERROR:
        draft.error = false;
        draft.changePasssword.error = false;
        break;

    }
  });

export default adminProfileReducer;
