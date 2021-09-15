/*
 * AdminLoginReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN, ADMIN_LOGIN_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminLoginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_LOGIN:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;

      case ADMIN_LOGIN_SUCCESS:
        draft.loading = false;
        draft.success = true;
        break;

      case ADMIN_LOGIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default adminLoginReducer;