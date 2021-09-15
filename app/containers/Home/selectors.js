/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeLogin = state => state.homelogin || initialState;

const makeSelectSuccess = () =>
  createSelector(
    selectHomeLogin,
    homeLoginState => homeLoginState.success,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHomeLogin,
    homeLoginState => homeLoginState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectHomeLogin,
    homeLoginState => homeLoginState.error,
  );

  const makeSelectProducts = () =>
    createSelector(
      selectHomeLogin,
      homeLoginState => homeLoginState.products,
    );
  const makeSelectCategory = () =>
    createSelector(
      selectHomeLogin,
      homeLoginState => homeLoginState.category,
    );

export {
  selectHomeLogin,
  // selectHomeForgetPassword,
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectError,
  makeSelectProducts,
  makeSelectCategory,
};
 