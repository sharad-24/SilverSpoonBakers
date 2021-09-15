/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ADMIN_LOGIN } from './constants';
import { adminLoginSuccess, adminLoginError } from './actions';

import { urls } from '../../../config/urls';
import { browserRedirect } from '../../../helpers/helpers';

/**
 * Github repos request/response handler
 */

function adminLoginCall(payload) {
  return request('post', urls.ADMIN_LOGIN_URL, payload);
}

function adminCurrentUserCall() {
  return request('get', urls.ADMIN_CURRENT_USER);
}

export function* adminLoginWorker({ payload }) {
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(adminLoginCall, payload);
    //console.log('response admin login', response.data);
    localStorage.removeItem('token');
    localStorage.setItem('token', response.data.data.AccessToken);
    const result = yield call(adminCurrentUserCall);
    //console.log('response admin current user', result.data.data);
    localStorage.removeItem('name');
    localStorage.setItem('name', result.data.data.name);
    
    localStorage.removeItem('type');
    localStorage.setItem('type', result.data.data.isAdmin ? 'admin' : 'staff');
    
    yield put(adminLoginSuccess(response));
    
    yield call(browserRedirect, '/admin/profile');
    
  } catch (err) {
    yield put(adminLoginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminLogin() {
  // Watches for ADMIN_LOGIN actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADMIN_LOGIN, adminLoginWorker);
}
