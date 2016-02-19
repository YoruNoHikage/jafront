import { takeEvery } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';

import { normalize } from 'normalizr';
import { Schemas } from '../middlewares/api';

import { requestUser } from '../actions/user';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/auth';

function callApiLogin(username = 'YoruNoHikage', password = 'opensesame') {
  return fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then(res => res.json());
}

function* loginRequest({ payload: { username, password } }) {
  try {
    const loginResponse = yield call(callApiLogin, username, password);
    if(loginResponse.error) {
      throw loginResponse.error;
    }

    const userResponse = yield put(requestUser(username)); // TODO : wait for the user response to dispatch login success

    // tmp, to be compatible with reducers
    const response = {
      type: LOGIN_SUCCESS,
      request: {
        endpoint: 'users/login',
        method: 'POST',
        payload: {
          username,
          password,
        },
      },
      response: normalize({
        id: loginResponse.userId,
        username,
        token: loginResponse.id,
      }, Schemas.USER)
    };
    yield put(response);
  } catch(error) {
    yield put({type: LOGIN_FAILURE, payload: error});
  }
}

function* watchLoginRequest() {
  yield* takeEvery(LOGIN_REQUEST, loginRequest);
}

export default function* auth(getState) {
  yield fork(watchLoginRequest);
}
