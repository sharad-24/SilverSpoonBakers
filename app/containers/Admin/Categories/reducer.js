/*
 * AdminCategoriesReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  ADMIN_CATEGORY_FETCH, ADMIN_CATEGORY_FETCH_SUCCESS, ADMIN_CATEGORY_FETCH_ERROR, 
  ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_ADD_SUCCESS, ADMIN_CATEGORY_ADD_ERROR,
  ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_EDIT_SUCCESS, ADMIN_CATEGORY_EDIT_ERROR,
  ADMIN_CATEGORY_DELETE, ADMIN_CATEGORY_DELETE_SUCCESS, ADMIN_CATEGORY_DELETE_ERROR,

  ADMIN_SUBCATEGORY_FETCH, ADMIN_SUBCATEGORY_FETCH_SUCCESS, ADMIN_SUBCATEGORY_FETCH_ERROR,
  ADMIN_SUBCATEGORY_ADD, ADMIN_SUBCATEGORY_ADD_SUCCESS, ADMIN_SUBCATEGORY_ADD_ERROR,
  ADMIN_SUBCATEGORY_EDIT, ADMIN_SUBCATEGORY_EDIT_SUCCESS, ADMIN_SUBCATEGORY_EDIT_ERROR,
  ADMIN_SUBCATEGORY_DELETE, ADMIN_SUBCATEGORY_DELETE_SUCCESS, ADMIN_SUBCATEGORY_DELETE_ERROR,

  ADMIN_CATEGORY_REMOVE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  category: null,
  subcategory: null,
  categoryAdd: {
    loading: false,
    error: false,
    success: false,
  },
  categoryEdit: {
    loading: false,
    error: false,
    success: false,
  },
  categoryDelete: {
    loading: false,
    error: false,
    success: false,
  },
  subcategoryAdd: {
    loading: false,
    error: false,
    success: false,
  },
  subcategoryEdit: {
    loading: false,
    error: false,
    success: false,
  },
  subcategoryDelete: {
    loading: false,
    error: false,
    success: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const adminCategoriesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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

      case ADMIN_CATEGORY_ADD:
        draft.categoryAdd.loading = true;
        draft.categoryAdd.error = false;
        draft.categoryAdd.success = false;
        break;

      case ADMIN_CATEGORY_ADD_SUCCESS:
        draft.categoryAdd.loading = false;
        draft.categoryAdd.success = true;
        break;

      case ADMIN_CATEGORY_ADD_ERROR:
        draft.categoryAdd.error = action.error;
        draft.categoryAdd.loading = false;
        break;

      case ADMIN_CATEGORY_EDIT:
        draft.categoryEdit.loading = true;
        draft.categoryEdit.error = false;
        draft.categoryEdit.success = false;
        break;

      case ADMIN_CATEGORY_EDIT_SUCCESS:
        draft.categoryEdit.loading = false;
        draft.categoryEdit.success = true;
        break;

      case ADMIN_CATEGORY_EDIT_ERROR:
        draft.categoryEdit.error = action.error;
        draft.categoryEdit.loading = false;
        break;
      
      case ADMIN_CATEGORY_DELETE:
        draft.categoryDelete.loading = true;
        draft.categoryDelete.error = false;
        draft.categoryDelete.success = false;
        break;

      case ADMIN_CATEGORY_DELETE_SUCCESS:
        draft.categoryDelete.loading = false;
        draft.categoryDelete.success = true;
        break;

      case ADMIN_CATEGORY_DELETE_ERROR:
        draft.categoryDelete.error = action.error;
        draft.categoryDelete.loading = false;
        break;  

      case ADMIN_SUBCATEGORY_FETCH:
        draft.loading = true;
        draft.error = false;
        draft.subcategory = null;
        break;

      case ADMIN_SUBCATEGORY_FETCH_SUCCESS:
        draft.loading = false;
        draft.subcategory = action.data;
        break;

      case ADMIN_SUBCATEGORY_FETCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADMIN_SUBCATEGORY_ADD:
        draft.subcategoryAdd.loading = true;
        draft.subcategoryAdd.error = false;
        draft.subcategoryAdd.success = false;
        break;

      case ADMIN_SUBCATEGORY_ADD_SUCCESS:
        draft.subcategoryAdd.loading = false;
        draft.subcategoryAdd.success = true;
        break;

      case ADMIN_SUBCATEGORY_ADD_ERROR:
        draft.subcategoryAdd.error = action.error;
        draft.subcategoryAdd.loading = false;
        break;

      case ADMIN_SUBCATEGORY_EDIT:
        draft.subcategoryEdit.loading = true;
        draft.subcategoryEdit.error = false;
        draft.subcategoryEdit.success = false;
        break;

      case ADMIN_SUBCATEGORY_EDIT_SUCCESS:
        draft.subcategoryEdit.loading = false;
        draft.subcategoryEdit.success = true;
        break;

      case ADMIN_SUBCATEGORY_EDIT_ERROR:
        draft.subcategoryEdit.error = action.error;
        draft.subcategoryEdit.loading = false;
        break;
      
      case ADMIN_SUBCATEGORY_DELETE:
        draft.subcategoryDelete.loading = true;
        draft.subcategoryDelete.error = false;
        draft.subcategoryDelete.success = false;
        break;

      case ADMIN_SUBCATEGORY_DELETE_SUCCESS:
        draft.subcategoryDelete.loading = false;
        draft.subcategoryDelete.success = true;
        break;

      case ADMIN_SUBCATEGORY_DELETE_ERROR:
        draft.subcategoryDelete.error = action.error;
        draft.subcategoryDelete.loading = false;
        break;

      case ADMIN_CATEGORY_REMOVE_ERROR:
        draft.categoryAdd.error = false;
        draft.categoryEdit.error = false;
        draft.categoryDelete.error = false;
    }
  });

export default adminCategoriesReducer;