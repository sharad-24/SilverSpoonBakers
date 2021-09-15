/*
 * AdminPromoCodeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  ADMIN_PROMO_CODE_FETCH, ADMIN_PROMO_CODE_FETCH_SUCCESS, ADMIN_PROMO_CODE_FETCH_ERROR,
  ADMIN_ALL_SUBCATEGORIES_FETCH, ADMIN_ALL_SUBCATEGORIES_FETCH_SUCCESS, ADMIN_ALL_SUBCATEGORIES_FETCH_ERROR, 
  ADMIN_PROMO_CODE_ADD, ADMIN_PROMO_CODE_ADD_SUCCESS, ADMIN_PROMO_CODE_ADD_ERROR,
  ADMIN_PROMO_CODE_EDIT, ADMIN_PROMO_CODE_EDIT_SUCCESS, ADMIN_PROMO_CODE_EDIT_ERROR,
  ADMIN_PROMO_CODE_DELETE, ADMIN_PROMO_CODE_DELETE_SUCCESS, ADMIN_PROMO_CODE_DELETE_ERROR ,

  ADMIN_PROMO_CODE_REMOVE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  promoCode: null,
  allSubcategories: null,
  promoCodeAdd: {
    loading: false,
    error: false,
    success: false,
  },
  promoCodeEdit: {
    loading: false,
    error: false,
    success: false,
  },
  promoCodeDelete: {
    loading: false,
    error: false,
    success: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const adminPromoCodeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADMIN_PROMO_CODE_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.promoCode = null;
        break;

      case ADMIN_PROMO_CODE_FETCH_SUCCESS:
        draft.loading = false;
        draft.promoCode = action.data;
        break;

      case ADMIN_PROMO_CODE_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
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

      case ADMIN_PROMO_CODE_ADD:
        draft.promoCodeAdd.loading = true;
        draft.promoCodeAdd.error = false;
        draft.promoCodeAdd.success = false;
        break;

      case ADMIN_PROMO_CODE_ADD_SUCCESS:
        draft.promoCodeAdd.loading = false;
        draft.promoCodeAdd.success = true;
        break;

      case ADMIN_PROMO_CODE_ADD_ERROR:
        draft.promoCodeAdd.error = action.error;
        draft.promoCodeAdd.loading = false;
        break;

      case ADMIN_PROMO_CODE_EDIT:
        draft.promoCodeEdit.loading = true;
        draft.promoCodeEdit.error = false;
        draft.promoCodeEdit.success = false;
        break;

      case ADMIN_PROMO_CODE_EDIT_SUCCESS:
        draft.promoCodeEdit.loading = false;
        draft.promoCodeEdit.success = true;
        break;

      case ADMIN_PROMO_CODE_EDIT_ERROR:
        draft.promoCodeEdit.error = action.error;
        draft.promoCodeEdit.loading = false;
        break;
      
      case ADMIN_PROMO_CODE_DELETE:
        draft.promoCodeDelete.loading = true;
        draft.promoCodeDelete.error = false;
        draft.promoCodeDelete.success = false;
        break;

      case ADMIN_PROMO_CODE_DELETE_SUCCESS:
        draft.promoCodeDelete.loading = false;
        draft.promoCodeDelete.success = true;
        break;

      case ADMIN_PROMO_CODE_DELETE_ERROR:
        draft.promoCodeDelete.error = action.error;
        draft.promoCodeDelete.loading = false;
        break;  

      case ADMIN_PROMO_CODE_REMOVE_ERROR:
        draft.error = false;
        draft.promoCodeAdd.error = false;
        draft.promoCodeEdit.error = false;
        draft.promoCodeDelete.error = false;
        break;
    }
  });

export default adminPromoCodeReducer;