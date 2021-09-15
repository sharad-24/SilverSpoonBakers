/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  ADMIN_CUSTOM_ORDER_FETCH,
  ADMIN_CUSTOM_ORDER_EDIT,
  ADMIN_CUSTOM_ORDER_DELETE,
} from './constants';
import {
  adminCustomOrderFetch,
  adminCustomOrderFetchSuccess,
  adminCustomOrderFetchError,
  admincustomOrderEditError,
  admincustomOrderEditSuccess,
  admincustomOrderDeleteSuccess,
  admincustomOrderDeleteError,
} from './actions';

import { urls } from '../../../config/urls';

/**
 * Github repos request/response handler
 */



function adminCustomOrderFetchCall() {
  return request('get', urls.CUSTOM_ORDER_URL);
}

function admincustomOrderEditCall(payload) {
  return request('PUT', urls.CUSTOM_ORDER_URL, payload);
}

function admincustomOrderDeleteCall(payload) {
  return request('delete', urls.CUSTOM_ORDER_URL, payload);
}



export function* adminCustomOrderFetchWorker() {
  try {
    // /console.log('cfetch');
    // Call our request helper (see 'utils/request')
    const response = yield call(adminCustomOrderFetchCall);
    //console.log('response admin custom order fetch: ', response.data);
    yield put(adminCustomOrderFetchSuccess(response.data.data));
  } catch (err) {
    yield put(adminCustomOrderFetchError(err));
  }
}

export function* admincustomOrderEditWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(admincustomOrderEditCall, payload.data);
    // console.log('response admin customOrder Edit', response.data);
    yield put(admincustomOrderEditSuccess());
    yield call(payload.oncustomOrderEditSuccess);
  } catch (err) {
    yield put(admincustomOrderEditError(err));
  }
}

export function* admincustomOrderDeleteWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(admincustomOrderDeleteCall, payload.data);
   // console.log('response admin Products delete', response.data);
    yield put(admincustomOrderDeleteSuccess());
    yield call(payload.oncustomOrderDeleteSuccess);
  } catch (err) {
    yield put(admincustomOrderDeleteError(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* admincustomOrder() {
  // Watches for ADMIN_Products actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADMIN_CUSTOM_ORDER_FETCH, adminCustomOrderFetchWorker); 
  yield takeLatest(ADMIN_CUSTOM_ORDER_EDIT, admincustomOrderEditWorker);
  yield takeLatest(ADMIN_CUSTOM_ORDER_DELETE, admincustomOrderDeleteWorker);
}
