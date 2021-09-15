/*
 * AdminForgetPasswordReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { ADMIN_FORGET_SUCCESS, ADMIN_FORGET, ADMIN_FORGET_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminForgetPasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_FORGET:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;

      case ADMIN_FORGET_SUCCESS:
        draft.loading = false;
        draft.success = true;
        break;

      case ADMIN_FORGET_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default adminForgetPasswordReducer;