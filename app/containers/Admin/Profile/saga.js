/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import { ADMIN_PROFILE_FETCH, ADMIN_CHANGE_PASSWORD } from './constants';
import Login from '../Login';
import {
  adminProfileFetch,
  adminProfileFetchSuccess,
  adminProfileFetchError,
  adminChangePasswordSuccess,
  adminChangePasswordError,
} from './actions';
import { browserRedirect } from '../../../helpers/helpers';
import {checkTokenExpiry} from '../../../helpers/helpers';


import { urls } from '../../../config/urls';

/**
 * Github repos request/response handler
 */

function adminProfileFetchCall() {
  try{
  return request('get', urls.ADMIN_CURRENT_USER);
  }
  catch (err) {
    <Login />
  }
}

function adminChangePasswordCall(payload) {
  const data = {};
  data.oldPassword = payload.oldPassword;
  data.newPassword = payload.newPassword;
  return request('put', urls.ADMIN_STAFF_URL, data);
}

export function* adminProfileFetchWorker() {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminProfileFetchCall);
    //  console.log('response admin profile fetch', response.data);
    yield put(adminProfileFetchSuccess(response.data.data));
  } catch (err) {
    // console.log("invoked-3" , err && err.response.status);
    if(!checkTokenExpiry(err)){
    yield put(adminProfileFetchError(err));
    }
  }
}

export function* adminChangePasswordWorker(payload) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminChangePasswordCall, payload.data);
    //  console.log('response admin Profile Update', response.data);
    yield put(adminChangePasswordSuccess());
    yield put(adminProfileFetch());
    yield call(payload.onChangePasswordSuccess);
  } catch (err) {
    yield put(adminChangePasswordError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminProfile() {
  // Watches for ADMIN_STAFF actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADMIN_PROFILE_FETCH, adminProfileFetchWorker);
  yield takeLatest(ADMIN_CHANGE_PASSWORD, adminChangePasswordWorker);
}
