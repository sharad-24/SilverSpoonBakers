/*
 * AdminCUSTOMERReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  ADMIN_CUSTOMER_FETCH, ADMIN_CUSTOMER_FETCH_SUCCESS, ADMIN_CUSTOMER_FETCH_ERROR, 
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  customer: null,
};

/* eslint-disable default-case, no-param-reassign */
const adminCustomerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_CUSTOMER_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.customer = null;
        break;

      case ADMIN_CUSTOMER_FETCH_SUCCESS:
        draft.loading = false;
        draft.customer = action.data;
        break;

      case ADMIN_CUSTOMER_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default adminCustomerReducer;