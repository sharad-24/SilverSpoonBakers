/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminProfile = state => state.adminprofile || initialState;

const makeSelectProfile = () =>
  createSelector(
    selectAdminProfile,
    adminProfileState => adminProfileState.profile,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminProfile,
    adminProfileState => adminProfileState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminProfile,
    adminProfileState => adminProfileState.error,
  );

const makeSelectChangePasssword = () =>
  createSelector(
    selectAdminProfile,
    adminProfileState => adminProfileState.changePasssword,
  );

export {
  selectAdminProfile,
  makeSelectProfile,
  makeSelectLoading,
  makeSelectError,
  makeSelectChangePasssword,
};
