/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminOrders = state => state.adminproducts || initialState;

const makeSelectOrders = () =>
  createSelector(
    selectAdminOrders,
    adminOrdersState => adminOrdersState.orders,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminOrders,
    adminOrdersState => adminOrdersState.loading,
  );

const makeSelectAllSubcategories = () =>
  createSelector(
    selectAdminOrders,
    adminOrdersState => adminOrdersState.allSubcategories,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminOrders,
    adminOrdersState => adminOrdersState.error,
  );

const makeSelectOrdersAdd = () =>
  createSelector(
    selectAdminOrders,
    adminOrdersState => adminOrdersState.ordersAdd,
  );

const makeSelectOrdersEdit = () =>
  createSelector(
    selectAdminOrders,
    adminOrdersState => adminOrdersState.ordersEdit,
  );

const makeSelectOrdersDelete = () =>
  createSelector(
    selectAdminOrders,
    adminOrdersState => adminOrdersState.ordersDelete,
  );

export {
  selectAdminOrders,
  makeSelectOrders,
  makeSelectLoading,
  makeSelectError,
  makeSelectOrdersEdit,
  makeSelectOrdersAdd,
  makeSelectOrdersDelete,
  makeSelectAllSubcategories,
};
