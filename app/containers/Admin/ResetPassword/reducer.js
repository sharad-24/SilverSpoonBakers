/*
 * AdminResetPasswordReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { ADMIN_RESET_PASSWORD_SUCCESS, ADMIN_RESET_PASSWORD, ADMIN_RESET_PASSWORD_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminResetPasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_RESET_PASSWORD:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;

      case ADMIN_RESET_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.success = true;
        break;

      case ADMIN_RESET_PASSWORD_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default adminResetPasswordReducer;