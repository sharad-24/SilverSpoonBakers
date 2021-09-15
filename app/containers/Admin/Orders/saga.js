/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  ADMIN_ORDERS_FETCH,
  ADMIN_ALL_SUBCATEGORIES_FETCH,
  ADMIN_ORDERS_ADD,
  ADMIN_ORDERS_EDIT,
  ADMIN_ORDERS_DELETE,
} from './constants';
import {
  adminOrdersFetch,
  adminOrdersFetchSuccess,
  adminOrdersFetchError,
  adminOrdersAddSuccess,
  adminOrdersAddError,
  adminOrdersEditError,
  adminOrdersEditSuccess,
  adminOrdersDeleteSuccess,
  adminOrdersDeleteError,
  adminAllSubcategoriesFetchSuccess,
  adminAllSubcategoriesFetchError,
} from './actions';

import { urls } from '../../../config/urls';
import {checkTokenExpiry} from '../../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function adminOrdersFetchCall() {
  return request('get', urls.ADMIN_ORDER_URL);
}

function adminOrdersAddCall(payload) {
  return request('post', urls.ADMIN_ORDER_URL, payload);
}

function adminOrdersEditCall(payload) {
  return request('PUT', urls.ADMIN_ORDER_URL, payload);
}

function adminOrdersDeleteCall(payload) {
  return request('delete', urls.ADMIN_ORDER_URL, payload);
}

export function* adminOrdersFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminOrdersFetchCall);
    // console.log('response admin Orders fetch', response.data.data);
    yield put(adminOrdersFetchSuccess(response.data.data));
  } catch (err) {
     // console.log("invoked-3" , err && err.response.status);
     if(!checkTokenExpiry(err)){
    yield put(adminOrdersFetchError(err));
     }
  }
}

export function* adminOrdersAddWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminOrdersAddCall, payload.data);
    // console.log('response admin Orders add', response.data);
    yield put(adminOrdersAddSuccess());
    yield put(adminOrdersFetch());
    yield call(payload.onOrdersAddSuccess);
  } catch (err) {
    yield put(adminOrdersAddError(err));
  }
}

export function* adminOrdersEditWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    console.log('invokedan');
    const response = yield call(adminOrdersEditCall, payload.data);
    console.log('response admin Orders Edit', response.data);
    yield put(adminOrdersEditSuccess());
    yield put(adminOrdersFetch());
    yield call(payload.onOrderEditSuccess);
  } catch (err) {
    yield put(adminOrdersEditError(err));
  }
}

export function* adminOrdersDeleteWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminOrdersDeleteCall, payload.data);
    // console.log('response admin Orders delete', response.data);
    yield put(adminOrdersDeleteSuccess());
    yield put(adminOrdersFetch());
    yield call(payload.onOrdersDeleteSuccess);
  } catch (err) {
    yield put(adminOrdersDeleteError(err));
  }
}

function adminAllSubcategoriesFetchCall() {
  return request('get', urls.ADMIN_SUBCATEGORY_URL, {}, { header: 0 });
}

export function* adminAllSubcategoriesFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminAllSubcategoriesFetchCall);
    // console.log('response admin all categories fetch', response.data);
    yield put(adminAllSubcategoriesFetchSuccess(response.data.data));
  } catch (err) {
    yield put(adminAllSubcategoriesFetchError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminOrders() {
  // Watches for ADMIN_ORDERs actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(
    ADMIN_ALL_SUBCATEGORIES_FETCH,
    adminAllSubcategoriesFetchWorker,
  );
  yield takeLatest(ADMIN_ORDERS_FETCH, adminOrdersFetchWorker);
  yield takeLatest(ADMIN_ORDERS_ADD, adminOrdersAddWorker);
  yield takeLatest(ADMIN_ORDERS_EDIT, adminOrdersEditWorker);
  yield takeLatest(ADMIN_ORDERS_DELETE, adminOrdersDeleteWorker);
}
