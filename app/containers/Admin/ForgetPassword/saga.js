/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_FORGET } from './constants';
import {
  adminForgetPasswordSuccess,
  adminForgetPasswordError,
} from './actions';

import request from '../../../utils/request';
import { urls } from '../../../config/urls';
import { browserRedirect } from '../../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function adminForgetPasswordCall(payload) {
  return request('post', urls.ADMIN_FORGET_PASSWORD_URL, payload);
}

export function* adminForgetPasswordWorker({ payload }) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminForgetPasswordCall, payload);
    //  console.log('response admin forget password', response.data);
    localStorage.removeItem('email');
    localStorage.setItem('email', payload.email);
    yield put(adminForgetPasswordSuccess(response));
    yield call(browserRedirect, '/admin/resetPassword');
  } catch (err) {
    yield put(adminForgetPasswordError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminForgetPassword() {
  // Watches for ADMIN_LOGIN actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADMIN_FORGET, adminForgetPasswordWorker);
}
