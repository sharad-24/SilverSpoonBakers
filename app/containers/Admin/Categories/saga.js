/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ADMIN_CATEGORY_FETCH,
  ADMIN_CATEGORY_ADD,
  ADMIN_CATEGORY_EDIT,
  ADMIN_CATEGORY_DELETE,
  ADMIN_SUBCATEGORY_FETCH,
  ADMIN_SUBCATEGORY_ADD,
  ADMIN_SUBCATEGORY_EDIT,
  ADMIN_SUBCATEGORY_DELETE,
} from './constants';
import {
  adminCategoryFetch,
  adminCategoryFetchSuccess,
  adminCategoryFetchError,
  adminCategoryAddSuccess,
  adminCategoryAddError,
  adminCategoryEditSuccess,
  adminCategoryEditError,
  adminCategoryDeleteSuccess,
  adminCategoryDeleteError,
  adminSubCategoryFetch,
  adminSubCategoryFetchSuccess,
  adminSubCategoryFetchError,
  adminSubCategoryAddSuccess,
  adminSubCategoryAddError,
  adminSubCategoryEditSuccess,
  adminSubCategoryEditError,
  adminSubCategoryDeleteSuccess,
  adminSubCategoryDeleteError,
} from './actions';

import request from '../../../utils/request';
import { urls } from '../../../config/urls';
import {checkTokenExpiry} from '../../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function adminCategoryFetchCall() {
  return request('get', urls.ADMIN_CATEGORY_URL, {}, { header: 0 });
}

function adminCategoryAddCall(payload) {
  return request('post', urls.ADMIN_CATEGORY_URL, payload);
}

function adminCategoryEditCall(payload) {
  return request('put', urls.ADMIN_CATEGORY_URL, payload);
}

function adminCategoryDeleteCall(payload) {
  return request('delete', urls.ADMIN_CATEGORY_URL, payload);
}

function adminSubCategoryFetchCall() {
  return request('get', urls.ADMIN_SUBCATEGORY_URL, {}, { header: 0 });
}

function adminSubCategoryAddCall(payload) {
  return request('post', urls.ADMIN_SUBCATEGORY_URL, payload);
}

function adminSubCategoryEditCall(payload) {
  return request('put', urls.ADMIN_SUBCATEGORY_URL, payload);
}

function adminSubCategoryDeleteCall(payload) {
  return request('delete', urls.ADMIN_SUBCATEGORY_URL, payload);
}

export function* adminCategoryFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')

    const response = yield call(adminCategoryFetchCall);

    //console.log('response admin category fetch', response.data);
    yield put(adminCategoryFetchSuccess(response.data.data));
  } catch (err) {
    if(!checkTokenExpiry(err)){
    yield put(adminCategoryFetchError(err));
    }
  }
}

export function* adminCategoryAddWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminCategoryAddCall, payload.data);
    //  console.log('response admin category add', response.data);
    yield put(adminCategoryAddSuccess());
    yield put(adminCategoryFetch());
    yield call(payload.onCategoryAddSuccess);
  } catch (err) {
    yield put(adminCategoryAddError(err));
  }
}

export function* adminCategoryEditWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminCategoryEditCall, payload.data);
    //  console.log('response admin category edit', response.data);
    yield put(adminCategoryEditSuccess());
    yield put(adminCategoryFetch());
    yield call(payload.onCategoryEditSuccess);
  } catch (err) {
    yield put(adminCategoryEditError(err));
  }
}

export function* adminCategoryDeleteWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminCategoryDeleteCall, payload.data);
    //  console.log('response admin category delete', response.data);
    yield put(adminCategoryDeleteSuccess());
    yield put(adminCategoryFetch());
    yield call(payload.onCategoryDeleteSuccess1);
    yield call(payload.onCategoryDeleteSuccess2);
  } catch (err) {
    yield put(adminCategoryDeleteError(err));
  }
}

export function* adminSubCategoryFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminSubCategoryFetchCall);
    //  console.log('response admin sub-category fetch', response.data);
    yield put(adminSubCategoryFetchSuccess(response.data.data));
  } catch (err) {
    yield put(adminSubCategoryFetchError(err));
  }
}

export function* adminSubCategoryAddWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminSubCategoryAddCall, payload.data);
    //  console.log('response admin sub category add', response.data);
    yield put(adminSubCategoryAddSuccess());
    yield put(adminSubCategoryFetch());
    yield call(payload.onSubCategoryAddSuccess);
  } catch (err) {
    yield put(adminSubCategoryAddError(err));
  }
}

export function* adminSubCategoryEditWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminSubCategoryEditCall, payload.data);
    //  console.log('response admin sub category edit', response.data);
    yield put(adminSubCategoryEditSuccess());
    yield put(adminSubCategoryFetch());
    yield call(payload.onSubCategoryEditSuccess);
  } catch (err) {
    yield put(adminSubCategoryEditError(err));
  }
}

export function* adminSubCategoryDeleteWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminSubCategoryDeleteCall, payload.data);
    //  console.log('response admin sub category delete', response.data);
    yield put(adminSubCategoryDeleteSuccess());
    yield put(adminSubCategoryFetch());
    yield call(payload.onSubCategoryDeleteSuccess1);
    yield call(payload.onSubCategoryDeleteSuccess2);
  } catch (err) {
    yield put(adminSubCategoryDeleteError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminCategory() {
  // Watches for ADMIN_CATEGORY actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADMIN_CATEGORY_FETCH, adminCategoryFetchWorker);
  yield takeLatest(ADMIN_CATEGORY_ADD, adminCategoryAddWorker);
  yield takeLatest(ADMIN_CATEGORY_EDIT, adminCategoryEditWorker);
  yield takeLatest(ADMIN_CATEGORY_DELETE, adminCategoryDeleteWorker);
  yield takeLatest(ADMIN_SUBCATEGORY_FETCH, adminSubCategoryFetchWorker);
  yield takeLatest(ADMIN_SUBCATEGORY_ADD, adminSubCategoryAddWorker);
  yield takeLatest(ADMIN_SUBCATEGORY_EDIT, adminSubCategoryEditWorker);
  yield takeLatest(ADMIN_SUBCATEGORY_DELETE, adminSubCategoryDeleteWorker);
}
