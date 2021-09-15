/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdmincustomOrder = state => state.customOrder || initialState;

const makeSelectCustomOrder = () =>
      createSelector(
        selectAdmincustomOrder,
        customOrderState => customOrderState.customOrder,
      )
    
  
const makeSelectLoading = () =>
  createSelector(
    selectAdmincustomOrder,
    customOrderState => customOrderState.loading,
  );


const makeSelectError = () =>
  createSelector(
    selectAdmincustomOrder,
    customOrderState => customOrderState.error,
  );

const makeSelectcustomOrderEdit = () =>
  createSelector(
    selectAdmincustomOrder,
    customOrderState => customOrderState.customOrderEdit,
  );
                                   

const makeSelectcustomOrderDelete = () =>
  createSelector(
    selectAdmincustomOrder,
    customOrderState => customOrderState.customOrderDelete,
  );

export {
  selectAdmincustomOrder,
  makeSelectCustomOrder,
  makeSelectLoading,
  makeSelectError,
  makeSelectcustomOrderEdit,
  makeSelectcustomOrderDelete,
};