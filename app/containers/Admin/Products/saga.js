/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  ADMIN_PRODUCTS_FETCH,
  ADMIN_FLAVOURS_FETCH,
  ADMIN_ALL_SUBCATEGORIES_FETCH,
  ADMIN_PRODUCTS_ADD,
  ADMIN_PRODUCTS_IMAGE_EDIT,
  ADMIN_PRODUCTS_EDIT,
  ADMIN_PRODUCTS_DELETE,
} from './constants';
import {
  adminProductsFetchSuccess,
  adminProductsFetchError,
  adminFlavoursFetch,
  adminFlavoursFetchSucess,
  adminFlavoursFetchError,
  adminProductsAddSuccess,
  adminProductsAddError,
  adminProductsEditError,
  adminProductsImageEdit,
  adminProductsImageEditError,
  adminProductsImageEditSuccess,
  adminProductsEditSuccess,
  adminProductsDeleteSuccess,
  adminProductsDeleteError,
  adminAllSubcategoriesFetchSuccess,
  adminAllSubcategoriesFetchError,
} from './actions';

import { urls } from '../../../config/urls';
import {checkTokenExpiry} from '../../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function adminProductsFetchCall() {
  return request('get', urls.ADMIN_PRODUCTS_URL);
}

function adminProductsAddCall(payload) {
  return request('post', urls.ADMIN_PRODUCTS_URL, payload);
}

function adminProductsEditCall(payload) {
  return request('PUT', urls.ADMIN_PRODUCTS_URL, payload);
}

function adminProductsImageEditCall(payload) {
  return request('PATCH', urls.ADMIN_PRODUCTS_URL, payload);
}

function adminProductsDeleteCall(payload) {
  return request('delete', urls.ADMIN_PRODUCTS_URL, payload);
}

export function* adminProductsFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminProductsFetchCall);
   console.log('response admin Products fetch', response.data.data);
    yield put(adminProductsFetchSuccess(response.data.data));
  } catch (err) {
    // console.log("invoked-3" , err && err.response.status);
    if(!checkTokenExpiry(err)){
    yield put(adminProductsFetchError(err));
    }
  }
}

export function* adminProductsAddWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminProductsAddCall, payload.data);
   // console.log('response admin Products add', response.data);
    yield put(adminProductsAddSuccess());
    //yield put(adminProductsFetch());
    yield call(payload.onProductsAddSuccess);
  } catch (err) {
    yield put(adminProductsAddError(err));
  }
}

export function* adminProductsEditWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    console.log('invokedan');
    const response = yield call(adminProductsEditCall, payload.data);
    console.log('response admin Products Edit', response.data);
    yield put(adminProductsEditSuccess());
    yield call(payload.onProductEditSuccess);
  } catch (err) {
    yield put(adminProductsEditError(err));
  }
}


export function* adminProductsImageEditWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    console.log('invoked image update');
    const response = yield call(adminProductsImageEditCall, payload.data);
    console.log('response admin Products Edit', response.data);
    yield put(adminProductsImageEditSuccess());
    //yield put(adminProductsFetch());
    yield call(payload.onProductImageEditSuccess);
  } catch (err) {
    yield put(adminProductsImageEditError(err));
  }
}

export function* adminProductsDeleteWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminProductsDeleteCall, payload.data);
   // console.log('response admin Products delete', response.data);
    yield put(adminProductsDeleteSuccess());
    yield put(adminProductsFetchWorker());
    yield call(payload.onProductsDeleteSuccess);
  } catch (err) {
    yield put(adminProductsDeleteError(err));
  }
}

function adminAllSubcategoriesFetchCall() {
  return request('get', urls.ADMIN_SUBCATEGORY_URL, {}, { header: 0 });
}

function adminFlavoursFetchCall() {
  return request('get', urls.FLAVOUR_URL, {}, { header: 0 });
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

export function* adminFlavoursFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminFlavoursFetchCall);
    // console.log('response admin all categories fetch', response.data);
    yield put(adminFlavoursFetchSucess(response.data.data));
  } catch (err) {
    yield put(adminFlavoursFetchError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminProducts() {
  // Watches for ADMIN_Products actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(
    ADMIN_ALL_SUBCATEGORIES_FETCH,
    adminAllSubcategoriesFetchWorker,
  );
  yield takeLatest(
    ADMIN_FLAVOURS_FETCH,
    adminFlavoursFetchWorker,
  );
  yield takeLatest(ADMIN_PRODUCTS_IMAGE_EDIT, adminProductsImageEditWorker)
  yield takeLatest(ADMIN_PRODUCTS_FETCH, adminProductsFetchWorker);
  yield takeLatest(ADMIN_PRODUCTS_ADD, adminProductsAddWorker); 
  yield takeLatest(ADMIN_PRODUCTS_EDIT, adminProductsEditWorker);
  yield takeLatest(ADMIN_PRODUCTS_DELETE, adminProductsDeleteWorker);
}
