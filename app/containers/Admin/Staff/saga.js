/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ADMIN_STAFF_FETCH,
  ADMIN_STAFF_ADD,
  ADMIN_STAFF_DELETE,
} from './constants';
import {
  adminStaffFetch,
  adminStaffFetchSuccess,
  adminStaffFetchError,
  adminStaffAddSuccess,
  adminStaffAddError,
  adminStaffDeleteSuccess,
  adminStaffDeleteError,
} from './actions';

import request from '../../../utils/request';
import { urls } from '../../../config/urls';
import {checkTokenExpiry} from '../../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function adminStaffFetchCall() {
  return request('get', urls.ADMIN_STAFF_URL);
}

function adminStaffAddCall(payload) {
  return request('post', urls.ADMIN_STAFF_URL, payload);
}

function adminStaffDeleteCall(payload) {
  return request('delete', urls.ADMIN_STAFF_URL, payload);
}

export function* adminStaffFetchWorker() {
  console.log("invoked");
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminStaffFetchCall);
    console.log("invoked-2" , response);
    //  console.log('response admin staff fetch', response.data);
    yield put(adminStaffFetchSuccess(response.data.data));
  } catch (err) {
    // console.log("invoked-3" , err && err.response.status);
    if(!checkTokenExpiry(err)){
    yield put(adminStaffFetchError(err));
  }
  }
}

export function* adminStaffAddWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminStaffAddCall, payload.data);
    //  console.log('response admin staff add', response.data);
    yield put(adminStaffAddSuccess());
    yield put(adminStaffFetch());
    yield call(payload.onStaffAddSuccess);
  } catch (err) {
    yield put(adminStaffAddError(err));
  }
}

export function* adminStaffDeleteWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminStaffDeleteCall, payload.data);
    //  console.log('response admin staff delete', response.data);
    yield put(adminStaffDeleteSuccess());
    yield put(adminStaffFetch());
    yield call(payload.onStaffDeleteSuccess);
  } catch (err) {
    yield put(adminStaffDeleteError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminStaff() {
  // Watches for ADMIN_STAFF actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADMIN_STAFF_FETCH, adminStaffFetchWorker);
  yield takeLatest(ADMIN_STAFF_ADD, adminStaffAddWorker);
  yield takeLatest(ADMIN_STAFF_DELETE, adminStaffDeleteWorker);
}
