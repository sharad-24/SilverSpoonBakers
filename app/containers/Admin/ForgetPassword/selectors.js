/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminForgetPassword = state => state.adminforgetpassword || initialState;

const makeSelectSuccess = () =>
  createSelector(
    selectAdminForgetPassword,
    adminForgetPasswordState => adminForgetPasswordState.success,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminForgetPassword,
    adminForgetPasswordState => adminForgetPasswordState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminForgetPassword,
    adminForgetPasswordState => adminForgetPasswordState.error,
  );

export {
  selectAdminForgetPassword,
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectError,
};