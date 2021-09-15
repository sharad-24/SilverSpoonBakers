/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminCategories = state => state.admincategories || initialState;

const makeSelectCategory = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.category,
  );

const makeSelectSubCategory = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.subcategory,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.error,
  );

const makeSelectCategoryAdd = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.categoryAdd,
  );

const makeSelectCategoryEdit = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.categoryEdit,
  );

const makeSelectCategoryDelete = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.categoryDelete,
  );
  
const makeSelectSubCategoryAdd = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.subcategoryAdd,
  );

const makeSelectSubCategoryEdit = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.subcategoryEdit,
  );

const makeSelectSubCategoryDelete = () =>
  createSelector(
    selectAdminCategories,
    adminCategoriesState => adminCategoriesState.subcategoryDelete,
  );

export {
  selectAdminCategories,
  makeSelectCategory,
  makeSelectSubCategory,
  makeSelectLoading,
  makeSelectError,
  makeSelectCategoryAdd,
  makeSelectCategoryEdit,
  makeSelectCategoryDelete,
  makeSelectSubCategoryAdd,
  makeSelectSubCategoryEdit,
  makeSelectSubCategoryDelete,
};