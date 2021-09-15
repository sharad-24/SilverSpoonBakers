/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminPromoCode = state => state.adminpromocode || initialState;

const makeSelectPromoCode = () =>
  createSelector(
    selectAdminPromoCode,
    adminPromoCodeState => adminPromoCodeState.promoCode,
  );

const makeSelectAllSubcategories = () =>
  createSelector(
    selectAdminPromoCode,
    adminPromoCodeState => adminPromoCodeState.allSubcategories,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminPromoCode,
    adminPromoCodeState => adminPromoCodeState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAdminPromoCode,
    adminPromoCodeState => adminPromoCodeState.error,
  );

const makeSelectPromoCodeAdd = () =>
  createSelector(
    selectAdminPromoCode,
    adminPromoCodeState => adminPromoCodeState.promoCodeAdd,
  );

const makeSelectPromoCodeEdit = () =>
  createSelector(
    selectAdminPromoCode,
    adminPromoCodeState => adminPromoCodeState.promoCodeEdit,
  );

const makeSelectPromoCodeDelete = () =>
  createSelector(
    selectAdminPromoCode,
    adminPromoCodeState => adminPromoCodeState.promoCodeDelete,
  );

export {
  selectAdminPromoCode,
  makeSelectPromoCode,
  makeSelectAllSubcategories,
  makeSelectLoading,
  makeSelectError,
  makeSelectPromoCodeAdd,
  makeSelectPromoCodeEdit,
  makeSelectPromoCodeDelete,
};