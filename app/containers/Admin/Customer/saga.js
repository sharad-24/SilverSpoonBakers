/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_CUSTOMER_FETCH } from './constants';
import { adminCustomerFetchSuccess, adminCustomerFetchError } from './actions';

import request from '../../../utils/request';
import { urls } from '../../../config/urls';
import {checkTokenExpiry} from '../../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function adminCustomerFetchCall() {
  return request('get', urls.ADMIN_CUSTOMER_URL);
}

export function* adminCustomerFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminCustomerFetchCall);
    //  console.log('response admin all customer fetch', response.data);
    yield put(adminCustomerFetchSuccess(response.data.data));
  } catch (err) {
    if(!checkTokenExpiry(err)){
    yield put(adminCustomerFetchError(err));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminCustomer() {
  // Watches for ADMIN_CUSTOMER actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADMIN_CUSTOMER_FETCH, adminCustomerFetchWorker);
}
