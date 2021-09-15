/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminFlavours = state => state.adminflavours || initialState;

const makeSelectFlavours = () =>
  createSelector(
    selectAdminFlavours,
    adminFlavoursState => adminFlavoursState.flavours,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminFlavours,
    adminFlavoursState => adminFlavoursState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminFlavours,
    adminFlavoursState => adminFlavoursState.error,
  );

const makeSelectFlavoursAdd = () =>
  createSelector(
    selectAdminFlavours,
    adminFlavoursState => adminFlavoursState.flavoursAdd,
  );

const makeSelectFlavoursEdit = () =>
  createSelector(
    selectAdminFlavours,
    adminFlavoursState => adminFlavoursState.flavoursEdit,
  );


const makeSelectFlavoursDelete = () =>
  createSelector(
    selectAdminFlavours,
    adminFlavoursState => adminFlavoursState.flavoursDelete,
  );

export {
  selectAdminFlavours,
  makeSelectFlavours,
  makeSelectLoading,
  makeSelectError,
  makeSelectFlavoursAdd,
  makeSelectFlavoursEdit,
  makeSelectFlavoursDelete,
};