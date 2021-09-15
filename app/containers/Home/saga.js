/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { HOME_LOGIN } from './constants';
import {
  HOME_FORGET,
  ADMIN_PRODUCTS_FETCH,
  ADMIN_CATEGORY_FETCH,
} from './constants';
import {
  homeForgetPasswordSuccess,
  homeForgetPasswordError,
  adminProductsFetch,
  adminProductsFetchSuccess,
  adminProductsFetchError,
  categoryFetch,
  categoryFetchSuccess,
  categoryFetchError,
} from './actions';

import { homeLoginSuccess, homeLoginError } from './actions';

import { urls } from '../../config/urls';
import { browserRedirect } from '../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function homeLoginCall(payload) {
  return request('post', urls.HOME_LOGIN_URL, payload);
}

function homeCurrentUserCall() {
  return request('get', urls.HOME_CURRENT_USER);
}

function adminProductsFetchCall() {
  return request('get', urls.ADMIN_PRODUCTS_URL);
}
function categoryFetchCall() {
  console.log('fetching categories..');
  return request('get', urls.ADMIN_CATEGORY_URL, {}, { header: 0 });
}

export function* homeLoginWorker({ payload }) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(homeLoginCall, payload);
    console.log('response home login', response.data);
    localStorage.removeItem('token');
    localStorage.setItem('token', response.data.data.AccessToken);
    const result = yield call(homeCurrentUserCall);
    console.log('response home current user', result.data.data);
    localStorage.removeItem('name');
    localStorage.setItem('name', result.data.data.name);
    
    localStorage.removeItem('type');
    localStorage.setItem('type', result.data.data.isHome ? 'home' : 'staff');
    
    yield put(homeLoginSuccess(response));
    
    yield call(browserRedirect, '/home/profile');
    
  } catch (err) {
    yield put(homeLoginError(err));
  }
}

function homeForgetPasswordCall(payload) {
  return request('post', urls.HOME_FORGET_PASSWORD_URL, payload);
}

export function* adminProductsFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminProductsFetchCall);
    console.log('response admin Products fetch', response.data.data);
    yield put(adminProductsFetchSuccess(response.data.data));
  } catch (err) {
    yield put(adminProductsFetchError(err));
  }
}

export function* categoryFetchWorker() {
  try {
    //console.log('category fetcg in saga invoked');
    // Call our request helper (see 'utils/request')
    const response = yield call(categoryFetchCall);
   // console.log('response admin Categories fetch', response.data.data);
    yield put(categoryFetchSuccess(response.data.data));
  } catch (err) {
    yield put(categoryFetchError(err));
  }
}

export function* homeForgetPasswordWorker({ payload }) {
try {
  // Call our request helper (see 'utils/request')
  const response = yield call(homeForgetPasswordCall, payload);
  console.log('response home forget password', response.data);
  localStorage.removeItem('email');
  localStorage.setItem('email', payload.email);
  yield put(homeForgetPasswordSuccess(response));
  yield call(browserRedirect, '/home/resetPassword');
} catch (err) {
  yield put(homeForgetPasswordError(err));
}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homeLogin() {
  // Watches for HOME_LOGIN actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(HOME_LOGIN, homeLoginWorker);
  yield takeLatest(ADMIN_PRODUCTS_FETCH, adminProductsFetchWorker);
  yield takeLatest(ADMIN_CATEGORY_FETCH, categoryFetchWorker);
}

// export default function* homeForgetPassword() {
//   // Watches for home_LOGIN actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(HOME_FORGET, homeForgetPasswordWorker);
// }
