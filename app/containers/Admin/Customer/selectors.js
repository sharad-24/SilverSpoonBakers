/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminCustomer = state => state.admincustomer || initialState;

const makeSelectCustomer = () =>
  createSelector(
    selectAdminCustomer,
    adminCustomerState => adminCustomerState.customer,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminCustomer,
    adminCustomerState => adminCustomerState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminCustomer,
    adminCustomerState => adminCustomerState.error,
  );

export {
  selectAdminCustomer,
  makeSelectCustomer,
  makeSelectLoading,
  makeSelectError,
};