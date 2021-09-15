/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_FLAVOURS_ADD,ADMIN_FLAVOURS_EDIT, ADMIN_FLAVOURS_DELETE } from './constants';
import {
  adminFlavoursAddSuccess,
  adminFlavoursAddError,
  adminFlavoursEditError,
  adminFlavoursEditSuccess,
  adminFlavoursDeleteSuccess,
  adminFlavoursDeleteError,
} from './actions';

import request from '../../../utils/request';
import { urls } from '../../../config/urls';

/**
 * Github repos request/response handler
 */

// export function* adminFlavoursFetchWorker() {
//   try {
//     // Call our request helper (see 'utils/request')
//     const response = yield call(adminStaffFetchCall);
//     //  console.log('response admin staff fetch', response.data);
//     yield put(adminFlavoursFetchSuccess(response.data.data));
//   } catch (err) {
//     yield put(adminFlavoursFetchError(err));
//   }
// }

function adminFlavoursAddCall(payload) {
  return request('post', urls.FLAVOUR_URL, payload);
}

function adminFlavoursEditCall(payload) {
  return request('PUT', urls.FLAVOUR_URL, payload);
}

function adminFlavoursDeleteCall(payload) {
  return request('delete', urls.FLAVOUR_URL, payload);
}

// export function* adminStaffFetchWorker() {
//   try {
//     // Call our request helper (see 'utils/request')
//     const response = yield call(adminStaffFetchCall);
//     //  console.log('response admin staff fetch', response.data);
//     yield put(adminStaffFetchSuccess(response.data.data));
//   } catch (err) {
//     yield put(adminStaffFetchError(err));
//   }
// }

export function* adminFlavoursAddWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminFlavoursAddCall, payload.data);
    //  console.log('response admin staff add', response.data);
    yield put(adminFlavoursAddSuccess());
   // yield put(adminFlavoursFetch());
    yield call(payload.onFlavoursAddSuccess);
  } catch (err) {
    yield put(adminFlavoursAddError(err));
  }
}

export function* adminFlavoursEditWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    console.log('invokedan');
    const response = yield call(adminFlavoursEditCall, payload.data);
    console.log('response admin Flavours Edit', response.data);
    yield put(adminFlavoursEditSuccess());
    // yield put(adminFlavoursFetch());
    yield call(payload.onFlavoursEditSuccess);
  } catch (err) {
    yield put(adminFlavoursEditError(err));
  }
}

export function* adminFlavoursDeleteWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminFlavoursDeleteCall, payload.data);
    //  console.log('response admin staff delete', response.data);
    yield put(adminFlavoursDeleteSuccess());
    //yield put(adminFlavoursFetch());
    yield call(payload.onFlavoursDeleteSuccess);
  } catch (err) {
    yield put(adminFlavoursDeleteError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminFlavours() {
  // Watches for ADMIN_STAFF actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  // yield takeLatest(ADMIN_STAFF_FETCH, adminStaffFetchWorker);
  // yield takeLatest(ADMIN_FLAVOURS_FETCH, adminFlavoursFetchWorker);
  yield takeLatest(ADMIN_FLAVOURS_ADD, adminFlavoursAddWorker);
  yield takeLatest(ADMIN_FLAVOURS_EDIT, adminFlavoursEditWorker);
  yield takeLatest(ADMIN_FLAVOURS_DELETE, adminFlavoursDeleteWorker);
}
