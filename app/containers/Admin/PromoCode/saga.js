/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ADMIN_PROMO_CODE_FETCH,
  ADMIN_ALL_SUBCATEGORIES_FETCH,
  ADMIN_PROMO_CODE_ADD,
  ADMIN_PROMO_CODE_EDIT,
  ADMIN_PROMO_CODE_DELETE,
} from './constants';
import {
adminPromoCodeFetch,
adminPromoCodeFetchSuccess,
adminPromoCodeFetchError,
  adminAllSubcategoriesFetchSuccess,
  adminAllSubcategoriesFetchError,
  adminPromoCodeAddSuccess,
  adminPromoCodeAddError,
  adminPromoCodeEditSuccess,
  adminPromoCodeEditError,
  adminPromoCodeDeleteSuccess,
  adminPromoCodeDeleteError,
} from './actions';

import request from '../../../utils/request';
import { urls } from '../../../config/urls';
import {checkTokenExpiry} from '../../../helpers/helpers';


/**
 * Github repos request/response handler
 */

function adminPromoCodeFetchCall() {
  return request('get', urls.ADMIN_PROMO_CODE_URL);
}

function adminAllSubcategoriesFetchCall() {
  return request('get', urls.ADMIN_SUBCATEGORY_URL, {}, { header: 0 });
}

function adminPromoCodeAddCall(payload) {
  return request('post', urls.ADMIN_PROMO_CODE_URL, payload);
}

function adminPromoCodeEditCall(payload) {
  return request('put', urls.ADMIN_PROMO_CODE_URL, payload);
}

function adminPromoCodeDeleteCall(payload) {
  return request('delete', urls.ADMIN_PROMO_CODE_URL, payload);
}

export function* adminPromoCodeFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
  const response = yield call(adminPromoCodeFetchCall);
    console.log('response admin promo code fetch', response.data);
  yield put(adminPromoCodeFetchSuccess(response.data.data));
  } catch (err) {
    // console.log("invoked-3" , err && err.response.status);
    if(!checkTokenExpiry(err)){
  yield put(adminPromoCodeFetchError(err));
    }
  }
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

export function* adminPromoCodeAddWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminPromoCodeAddCall, payload.data);
    //  console.log('response admin promo code add', response.data);
    yield put(adminPromoCodeAddSuccess());
  yield put(adminPromoCodeFetch());
    yield call(payload.onPromoCodeAddSuccess);
  } catch (err) {
    yield put(adminPromoCodeAddError(err));
  }
}

export function* adminPromoCodeEditWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminPromoCodeEditCall, payload.data);
    //  console.log('response admin promo code edit', response.data);
    yield put(adminPromoCodeEditSuccess());
  yield put(adminPromoCodeFetch());
    yield call(payload.onPromoCodeEditSuccess);
  } catch (err) {
    yield put(adminPromoCodeEditError(err));
  }
}

export function* adminPromoCodeDeleteWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminPromoCodeDeleteCall, payload.data);
    //  console.log('response admin promo code delete', response.data);
    yield put(adminPromoCodeDeleteSuccess());
  yield put(adminPromoCodeFetch());
    yield call(payload.onPromoCodeDeleteSuccess);
  } catch (err) {
    yield put(adminPromoCodeDeleteError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminPromoCode() {
  // Watches for ADMIN_PROMO_CODE actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
yield takeLatest(ADMIN_PROMO_CODE_FETCH, adminPromoCodeFetchWorker);
  yield takeLatest(
    ADMIN_ALL_SUBCATEGORIES_FETCH,
    adminAllSubcategoriesFetchWorker,
  );
  yield takeLatest(ADMIN_PROMO_CODE_ADD, adminPromoCodeAddWorker);
  yield takeLatest(ADMIN_PROMO_CODE_EDIT, adminPromoCodeEditWorker);
  yield takeLatest(ADMIN_PROMO_CODE_DELETE, adminPromoCodeDeleteWorker);
}
