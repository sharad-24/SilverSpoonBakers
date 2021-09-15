/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminStaff = state => state.adminstaff || initialState;

const makeSelectStaff = () =>
  createSelector(
    selectAdminStaff,
    adminStaffState => adminStaffState.staff,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminStaff,
    adminStaffState => adminStaffState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminStaff,
    adminStaffState => adminStaffState.error,
  );

const makeSelectStaffAdd = () =>
  createSelector(
    selectAdminStaff,
    adminStaffState => adminStaffState.staffAdd,
  );

const makeSelectStaffDelete = () =>
  createSelector(
    selectAdminStaff,
    adminStaffState => adminStaffState.staffDelete,
  );

export {
  selectAdminStaff,
  makeSelectStaff,
  makeSelectLoading,
  makeSelectError,
  makeSelectStaffAdd,
  makeSelectStaffDelete,
};