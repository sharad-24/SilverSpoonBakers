/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminResetPassword = state => state.adminresetpassword || initialState;

const makeSelectSuccess = () =>
  createSelector(
    selectAdminResetPassword,
    adminResetPasswordState => adminResetPasswordState.success,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminResetPassword,
    adminResetPasswordState => adminResetPasswordState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminResetPassword,
    adminResetPasswordState => adminResetPasswordState.error,
  );

export {
  selectAdminResetPassword,
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectError,
};