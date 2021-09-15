/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_RESET_PASSWORD } from './constants';
import { adminResetPasswordSuccess, adminResetPasswordError } from './actions';

import request from '../../../utils/request';
import { urls } from '../../../config/urls';
import { browserRedirect } from '../../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function adminResetPasswordCall(payload) {
  const data = {};
  data.email = localStorage.getItem('email');
  data.otp = payload.otp;
  data.password = payload.newpassword;
  return request('post', urls.ADMIN_RESET_PASSWORD_URL, data);
}

export function* adminResetPasswordWorker({ payload }) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminResetPasswordCall, payload);
    //  console.log('response admin reset password', response.data);
    localStorage.removeItem('email');
    yield put(adminResetPasswordSuccess(response));
    yield call(browserRedirect, '/admin/login');
  } catch (err) {
    yield put(adminResetPasswordError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminResetPassword() {
  // Watches for ADMIN_LOGIN actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADMIN_RESET_PASSWORD, adminResetPasswordWorker);
}
