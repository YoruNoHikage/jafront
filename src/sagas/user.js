import { takeEvery } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';

import { USER } from '../actions/user';

function* followRequest() {
  // try {
  //
  // } catch() {
  //
  // }
}

function* watchFollow() {
  yield* takeEvery(USER.REQUEST, followRequest);
}

export default function* user(getState) {
  yield fork(watchFollow);
}
