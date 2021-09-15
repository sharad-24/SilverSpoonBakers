/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminLogin = state => state.adminlogin || initialState;

const makeSelectSuccess = () =>
  createSelector(
    selectAdminLogin,
    adminLoginState => adminLoginState.success,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminLogin,
    adminLoginState => adminLoginState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminLogin,
    adminLoginState => adminLoginState.error,
  );

export {
  selectAdminLogin,
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectError,
};