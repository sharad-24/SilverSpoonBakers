/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminProducts = state => state.adminproducts || initialState;

const makeSelectProducts = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.products,
  );

const makeSelectFlavours = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.flavours,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.loading,
  );

const makeSelectAllSubcategories = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.allSubcategories,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.error,
  );

const makeSelectProductsAdd = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.productsAdd,
  );

const makeSelectProductsEdit = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.productsEdit,
  );

const makeSelectProductsImageEdit = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.productsImageEdit,
  );

const makeSelectProductsDelete = () =>
  createSelector(
    selectAdminProducts,
    adminProductsState => adminProductsState.productsDelete,
  );

export {
  selectAdminProducts,
  makeSelectProducts,
  makeSelectFlavours,
  makeSelectLoading,
  makeSelectError,
  makeSelectProductsEdit,
  makeSelectProductsImageEdit,
  makeSelectProductsAdd,
  makeSelectProductsDelete,
  makeSelectAllSubcategories,
};